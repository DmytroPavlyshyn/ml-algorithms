import datetime
import math
import time
import uuid

import numpy as np
import pandas as pd
from sklearn.base import BaseEstimator, ClassifierMixin

from ml_algo_back_end import settings
from .file_utils import FileUtils
from .wiener_polynom import WienerPolynomialFeatures
from .factory import RegressorFactory

wp_features = WienerPolynomialFeatures()


class MaxScaler(BaseEstimator, ClassifierMixin):

    def __init__(self, name="MaxScaler"):
        self.name = name

    def fit(self, X):
        self.max_elements = np.amax(X, axis=0)
        return self

    def transform(self, X):
        scaledX = X / self.max_elements
        return scaledX


class GRNN(BaseEstimator, ClassifierMixin):
    def __init__(self, name="GRNN", sigma=0.1):
        self.name = name
        self.sigma = 2 * np.power(sigma, 2)

    def predict(self, instance_X, train_X, train_y):
        gausian_distances = np.exp(-np.power(np.sqrt((np.square(train_X - instance_X).sum(axis=1))), 2) / self.sigma)
        gausian_distances_sum = gausian_distances.sum()
        if gausian_distances_sum < math.pow(10, -7):
            gausian_distances_sum = math.pow(10, -7)
        result = np.multiply(gausian_distances, train_y).sum() / gausian_distances_sum
        return result


def mean_absolute_percentage_error(y_true, y_pred):
    y_true, y_pred = np.array(y_true), np.array(y_pred)
    return np.mean(np.abs((y_true - y_pred) / y_true)) * 100


def sum_of_squared_errors(y_true, y_pred):
    y_true, y_pred = np.array(y_true), np.array(y_pred)
    return math.sqrt(np.sum((y_true - y_pred) ** 2))


def symmetric_mean_absolute_percentage_error(y_true, y_pred):
    y_true, y_pred = np.array(y_true), np.array(y_pred)
    return np.sum(np.abs(y_true - y_pred)) / np.sum(y_pred + y_true)


def root_mean_squared_error(y_true, y_pred):
    return np.sqrt(((y_pred - y_true) ** 2).mean())


def mean_absolute_error(y_true, y_pred):
    y_true, y_pred = np.array(y_true), np.array(y_pred)
    return np.mean(np.abs(y_true - y_pred))


def calculate_errors(y_true, y_pred):
    return {
        'mean_absolute_percentage': mean_absolute_percentage_error(y_true, y_pred),
        'root_mean_squared': root_mean_squared_error(y_true, y_pred),
        'sum_of_squared_errors': sum_of_squared_errors(y_true, y_pred),
        'symmetric_mean_absolute_percentage_error': symmetric_mean_absolute_percentage_error(y_true,
                                                                                             y_pred),
        'mean_absolute_error': mean_absolute_error(y_true, y_pred)
    }


class DataFrameReader:

    def __init__(self, train_path, test_path):
        df_train = pd.read_csv(train_path, header=None)
        df_test = pd.read_csv(test_path, header=None)

        self.train_X = df_train.iloc[:, :-1]
        self.train_y = df_train.iloc[:, -1]
        self.test_X = df_test.iloc[:, :-1]
        self.test_y = df_test.iloc[:, -1]

        scaler = MaxScaler()
        scaler.fit(self.train_X)
        self.train_X = scaler.transform(self.train_X)
        self.test_X = scaler.transform(self.test_X)


def save_df_to_file(df=pd.DataFrame()):
    root = settings.PREDICTIONS_ROOT
    ts = datetime.datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
    batch_id = str(uuid.uuid4())
    target_path = f"{root}/{ts}_{batch_id}.csv"

    df.to_csv(target_path, sep=',', encoding='utf-8')
    return target_path


class GenericProcessor:

    def process(self, request, user):
        regressor = RegressorFactory.create(request)
        dr = DataFrameReader(
            FileUtils.build_path(request['train_path'], user),
            FileUtils.build_path(request['test_path'], user),
        )
        start_time = time.time()
        regressor.fit(dr.train_X, dr.train_y)
        train_pred_y = regressor.predict(dr.train_X)
        pred_y = regressor.predict(dr.test_X)

        train_predictions = dr.train_X.copy()
        train_predictions['predictions'] = train_pred_y

        test_predictions = dr.test_X.copy()
        test_predictions['predictions'] = pred_y

        prediction_train_output_path = save_df_to_file(train_predictions)
        prediction_test_output_path = save_df_to_file(test_predictions)

        stats = dict()

        stats['prediction_train_output_path'] = prediction_train_output_path
        stats['prediction_test_output_path'] = prediction_test_output_path

        stats['job_duration'] = time.time() - start_time

        stats['training_errors'] = calculate_errors(dr.train_y, train_pred_y)
        stats['testing_errors'] = calculate_errors(dr.test_y, pred_y)

        stats['train_path'] = request['train_path']
        stats['test_path'] = request['test_path']

        return {
            'request': request,
            'stats': stats
        }


from sklearn.svm import SVR


class SVRProcessor:
    def process(
            self, train_path: str, test_path: str,
            **kwargs
    ):
        dr = DataFrameReader(train_path, test_path)

        start_time = time.time()

        if kwargs['use_wiener']:
            n = kwargs['wiener_n']
            dr.test_X = wp_features.fit(dr.test_X, n)
            dr.train_X = wp_features.fit(dr.train_X, n)

        if 'use_wiener' in kwargs:
            del kwargs['use_wiener']
        if 'wiener_n' in kwargs:
            del kwargs['wiener_n']

        svr = SVR(
            **kwargs
        )

        svr.fit(dr.train_X, dr.train_y)
        train_pred_y = svr.predict(dr.train_X)
        pred_y = svr.predict(dr.test_X)

        train_predictions = dr.train_X.copy()
        train_predictions['predictions'] = train_pred_y

        test_predictions = dr.test_X.copy()
        test_predictions['predictions'] = pred_y

        prediction_train_output_path = save_df_to_file(train_predictions)
        prediction_test_output_path = save_df_to_file(test_predictions)

        stats = dict(kwargs)

        stats['prediction_train_output_path'] = prediction_train_output_path
        stats['prediction_test_output_path'] = prediction_test_output_path

        stats['job_duration'] = time.time() - start_time

        stats['training_errors'] = calculate_errors(dr.train_y, train_pred_y)
        stats['testing_errors'] = calculate_errors(dr.test_y, pred_y)

        stats['train_path'] = train_path
        stats['test_path'] = test_path
        return stats


from sklearn.linear_model import SGDRegressor


class SGDProcessor:

    def process(
            self, train_path: str, test_path: str,
            **kwargs
    ):
        dr = DataFrameReader(train_path, test_path)

        start_time = time.time()
        if kwargs['use_wiener']:
            n = kwargs['wiener_n']
            dr.test_X = wp_features.fit(dr.test_X, n)
            dr.train_X = wp_features.fit(dr.train_X, n)

        if 'use_wiener' in kwargs:
            del kwargs['use_wiener']
        if 'wiener_n' in kwargs:
            del kwargs['wiener_n']

        sgd = SGDRegressor(
            **kwargs
        )

        sgd.fit(dr.train_X, dr.train_y)
        train_pred_y = sgd.predict(dr.train_X)
        pred_y = sgd.predict(dr.test_X)

        train_predictions = dr.train_X.copy()
        train_predictions['predictions'] = train_pred_y

        test_predictions = dr.test_X.copy()
        test_predictions['predictions'] = pred_y

        prediction_train_output_path = save_df_to_file(train_predictions)
        prediction_test_output_path = save_df_to_file(test_predictions)

        stats = dict(kwargs)
        stats['job_duration'] = time.time() - start_time

        stats['prediction_train_output_path'] = prediction_train_output_path
        stats['prediction_test_output_path'] = prediction_test_output_path

        stats['training_errors'] = calculate_errors(dr.train_y, train_pred_y)
        stats['testing_errors'] = calculate_errors(dr.test_y, pred_y)

        stats['train_path'] = str(train_path)
        stats['test_path'] = str(test_path)
        return stats


from sklearn.ensemble import AdaBoostRegressor
from sklearn.tree import DecisionTreeRegressor

import inspect


class AdaBoostProcessor:

    def process(
            self, train_path: str, test_path: str,
            **kwargs
    ):
        dr = DataFrameReader(train_path, test_path)
        if kwargs['use_wiener']:
            n = kwargs['wiener_n']
            dr.test_X = wp_features.fit(dr.test_X, n)
            dr.train_X = wp_features.fit(dr.train_X, n)

        if 'use_wiener' in kwargs:
            del kwargs['use_wiener']
        if 'wiener_n' in kwargs:
            del kwargs['wiener_n']

        decision_tree_params = inspect.signature(DecisionTreeRegressor.__init__).parameters.keys()

        def filter_dt_params(tuple):
            key = tuple[0]
            if decision_tree_params.__contains__(key):
                return True
            else:
                return False

        decision_tree_values = dict(filter(filter_dt_params, kwargs.items()))

        ada_boost_params = inspect.signature(AdaBoostRegressor.__init__).parameters.keys()

        def filter_ab_params(tuple):
            key = tuple[0]
            if ada_boost_params.__contains__(key):
                return True
            else:
                return False

        ada_boost_values = dict(filter(filter_ab_params, kwargs.items()))

        adaboost = AdaBoostRegressor(
            DecisionTreeRegressor(
                **decision_tree_values
            ),
            **ada_boost_values
        )
        start_time = time.time()
        adaboost.fit(dr.train_X, dr.train_y)

        train_pred_y = adaboost.predict(dr.train_X)
        pred_y = adaboost.predict(dr.test_X)

        train_predictions = dr.train_X.copy()
        train_predictions['predictions'] = train_pred_y

        test_predictions = dr.test_X.copy()
        test_predictions['predictions'] = pred_y

        prediction_train_output_path = save_df_to_file(train_predictions)
        prediction_test_output_path = save_df_to_file(test_predictions)

        stats = dict(kwargs)
        stats['job_duration'] = time.time() - start_time,

        stats['prediction_train_output_path'] = prediction_train_output_path
        stats['prediction_test_output_path'] = prediction_test_output_path

        stats['training_errors'] = calculate_errors(dr.train_y, train_pred_y)
        stats['testing_errors'] = calculate_errors(dr.test_y, pred_y)

        stats['train_path'] = str(train_path)
        stats['test_path'] = str(test_path)
        return stats


from sklearn.ensemble import RandomForestRegressor


class RandomForestProcessor:

    def process(
            self, train_path: str, test_path: str,
            **kwargs
    ):
        dr = DataFrameReader(train_path, test_path)
        start_time = time.time()
        if kwargs['use_wiener']:
            n = kwargs['wiener_n']
            dr.test_X = wp_features.fit(dr.test_X, n)
            dr.train_X = wp_features.fit(dr.train_X, n)

        if 'use_wiener' in kwargs:
            del kwargs['use_wiener']
        if 'wiener_n' in kwargs:
            del kwargs['wiener_n']

        regr = RandomForestRegressor(
            **kwargs
        )

        regr.fit(dr.train_X, dr.train_y)
        train_pred_y = regr.predict(dr.train_X)
        pred_y = regr.predict(dr.test_X)

        train_predictions = dr.train_X.copy()
        train_predictions['predictions'] = train_pred_y

        test_predictions = dr.test_X.copy()
        test_predictions['predictions'] = pred_y

        prediction_train_output_path = save_df_to_file(train_predictions)
        prediction_test_output_path = save_df_to_file(test_predictions)

        stats = dict(kwargs)
        stats['job_duration'] = time.time() - start_time,

        stats['prediction_train_output_path'] = prediction_train_output_path
        stats['prediction_test_output_path'] = prediction_test_output_path

        stats['training_errors'] = calculate_errors(dr.train_y, train_pred_y)
        stats['testing_errors'] = calculate_errors(dr.test_y, pred_y)

        stats['train_path'] = str(train_path)
        stats['test_path'] = str(test_path)
        return stats


from sklearn.neural_network import MLPRegressor


class MLPProcessor:
    def process(
            self, train_path: str, test_path: str,
            **kwargs
    ):
        dr = DataFrameReader(train_path, test_path)

        start_time = time.time()
        if kwargs['use_wiener']:
            n = kwargs['wiener_n']
            dr.test_X = wp_features.fit(dr.test_X, n)
            dr.train_X = wp_features.fit(dr.train_X, n)

        if 'use_wiener' in kwargs:
            del kwargs['use_wiener']
        if 'wiener_n' in kwargs:
            del kwargs['wiener_n']

        mlp = MLPRegressor(
            **kwargs
        )
        mlp.fit(dr.train_X, dr.train_y)
        train_pred_y = mlp.predict(dr.train_X)
        pred_y = mlp.predict(dr.test_X)

        train_predictions = dr.train_X.copy()
        train_predictions['predictions'] = train_pred_y

        test_predictions = dr.test_X.copy()
        test_predictions['predictions'] = pred_y

        prediction_train_output_path = save_df_to_file(train_predictions)
        prediction_test_output_path = save_df_to_file(test_predictions)

        stats = dict(kwargs)
        stats['job_duration'] = time.time() - start_time,

        stats['prediction_train_output_path'] = prediction_train_output_path
        stats['prediction_test_output_path'] = prediction_test_output_path

        stats['training_errors'] = calculate_errors(dr.train_y, train_pred_y)
        stats['testing_errors'] = calculate_errors(dr.test_y, pred_y)

        stats['train_path'] = str(train_path)
        stats['test_path'] = str(test_path)
        return stats


class AllAlgorithmsProcessor:
    def process(
            self,
            **kwargs
    ):
        all_propcessors = {
            "grrn": GRRNProcessor(),
            "svr": SVRProcessor(),
            "sgd": SGDProcessor(),
            "ada-boost": AdaBoostProcessor(),
            "random-forest": RandomForestProcessor(),
            "mlp": MLPProcessor()
        }
        stats_per_processor = {}
        for key in all_propcessors:
            stats_per_processor[key] = all_propcessors[key].process(**filter_null(kwargs[key]))

        df_train = pd.read_csv(stats_per_processor['grrn']['train_path'], header=None)
        df_test = pd.read_csv(stats_per_processor['grrn']['test_path'], header=None)

        for key in stats_per_processor:
            if key == 'grrn':
                test = pd.read_csv(stats_per_processor[key]['test_prediction_out'])
                df_test[key] = test['predictions']
            else:
                test = pd.read_csv(stats_per_processor[key]['prediction_test_output_path'])
                train = pd.read_csv(stats_per_processor[key]['prediction_train_output_path'])
                df_test[key] = test['predictions']
                df_train[key] = train['predictions']
            print(f"Processed: {key}")
        prediction_train_output_path = save_df_to_file(df_train)
        prediction_test_output_path = save_df_to_file(df_test)
        stats = {'stats_per_processor': stats_per_processor,
                 'prediction_train_output_path': prediction_train_output_path,
                 'prediction_test_output_path': prediction_test_output_path}
        return stats


def filter_null(kwargs):
    return {k: v for k, v in kwargs.items() if v is not None}
