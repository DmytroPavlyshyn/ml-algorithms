import pandas as pd
import numpy as np
import math
import time

from sklearn.base import BaseEstimator, ClassifierMixin


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
        if gausian_distances_sum < math.pow(10, -7): gausian_distances_sum = math.pow(10, -7)
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


class DataFrameReader:

    def __init__(self, train_path, test_path):
        # 'd:/target/trainCO.txt'
        df_train = pd.read_csv(train_path, header=None)
        # 'd:/target/testCO.txt'
        df_test = pd.read_csv(test_path, header=None)

        train_size = len(df_train)
        self.train_X = df_train.iloc[:, :-1]
        self.train_y = df_train.iloc[:, -1]
        self.test_X = df_test.iloc[:, :-1]
        self.test_y = df_test.iloc[:, -1]


class InformalProcessorInterface:
    def process(self, train_path: str, test_path: str, **kwargs):
        """Load in the file for extracting text."""
        pass


class GRRNProcessor(InformalProcessorInterface):

    def process(self, train_path: str, test_path: str, **kwargs):
        dr = DataFrameReader(train_path, test_path)

        sigma = kwargs['sigma']
        grnn = GRNN(sigma=sigma)
        start_time = time.time()
        predictions = np.apply_along_axis(lambda i: grnn.predict(i, dr.train_X, dr.train_y), axis=1, arr=dr.test_X)
        return {
            'job_duration': time.time() - start_time,
            'sigma': sigma,
            'testing_mape': mean_absolute_percentage_error(dr.test_y, predictions),
            'testing_rmse': root_mean_squared_error(dr.test_y, predictions),
            'train_path': train_path,
            'test_path': test_path,
        }


from sklearn.svm import SVR


class SVRProcessor(InformalProcessorInterface):
    def process(self, train_path: str, test_path: str, **kwargs):
        dr = DataFrameReader(train_path, test_path)

        # svr = SVR(kernel='rbf', gamma='auto', coef0=0.0, epsilon=0.001, max_iter=200)
        svr = SVR(
            kernel=kwargs['kernel'],
            gamma=kwargs['gamma'],
            degree=kwargs['degree'],
            coef0=kwargs['coef0'],
            tol=kwargs['tol'],
            C=kwargs['C'],
            epsilon=kwargs['epsilon'],
            shrinking=kwargs['shrinking'],
            cache_size=kwargs['cache_size'],
            verbose=kwargs['verbose'],
            max_iter=kwargs['max_iter'],
        )

        start_time = time.time()
        svr.fit(dr.train_X, dr.train_y)
        train_pred_y = svr.predict(dr.train_X)
        pred_y = svr.predict(dr.test_X)
        return {
            'job_duration': str(time.time() - start_time),
            'kernel': str(kwargs['kernel']),
            'gamma': str(kwargs['gamma']),
            'degree': str(kwargs['degree']),
            'coef0': str(kwargs['coef0']),
            'tol': str(kwargs['tol']),
            'C': str(kwargs['C']),
            'epsilon': str(kwargs['epsilon']),
            'shrinking': str(kwargs['shrinking']),
            'cache_size': str(kwargs['cache_size']),
            'verbose': str(kwargs['verbose']),
            'max_iter': str(kwargs['max_iter']),
            "training_error_mape": str(mean_absolute_percentage_error(dr.train_y, train_pred_y)),
            "training_error_rmse": str(root_mean_squared_error(dr.train_y, train_pred_y)),
            "testing_error_mape": str(mean_absolute_percentage_error(dr.test_y, pred_y)),
            "testing_error_rmse": str(root_mean_squared_error(dr.test_y, pred_y)),
            'train_path': str(train_path),
            'test_path': str(test_path),

        }


from sklearn.linear_model import SGDRegressor


class SGDProcessor(InformalProcessorInterface):

    def process(self, train_path: str, test_path: str, **kwargs):
        dr = DataFrameReader(train_path, test_path)

        sgd = SGDRegressor(
            loss=kwargs['loss'],
            penalty=kwargs['penalty'],
            alpha=kwargs['alpha'],
            l1_ratio=kwargs['l1_ratio'],
            fit_intercept=kwargs['fit_intercept'],
            max_iter=kwargs['max_iter'],
            tol=kwargs['tol'],
            shuffle=kwargs['shuffle'],
            verbose=kwargs['verbose'],
            epsilon=kwargs['epsilon'],
            learning_rate=kwargs['learning_rate'],
            eta0=kwargs['eta0'],
            power_t=kwargs['power_t'],
            early_stopping=kwargs['early_stopping'],
            validation_fraction=kwargs['validation_fraction'],
            n_iter_no_change=kwargs['n_iter_no_change'],
            warm_start=kwargs['warm_start'],
            average=kwargs['average'],
        )
        start_time = time.time()
        sgd.fit(dr.train_X, dr.train_y)
        print("--- %s seconds ---" % (time.time() - start_time))
        train_pred_y = sgd.predict(dr.train_X)
        pred_y = sgd.predict(dr.test_X)

        return {
            'loss': str(kwargs['loss']),
            'penalty': str(kwargs['penalty']),
            'alpha': str(kwargs['alpha']),
            'l1_ratio': str(kwargs['l1_ratio']),
            'fit_intercept': str(kwargs['fit_intercept']),
            'max_iter': str(kwargs['max_iter']),
            'tol': str(kwargs['tol']),
            'shuffle': str(kwargs['shuffle']),
            'verbose': str(kwargs['verbose']),
            'epsilon': str(kwargs['epsilon']),
            'learning_rate': str(kwargs['learning_rate']),
            'eta0': str(kwargs['eta0']),
            'power_t': str(kwargs['power_t']),
            'early_stopping': str(kwargs['early_stopping']),
            'validation_fraction': str(kwargs['validation_fraction']),
            'n_iter_no_change': str(kwargs['n_iter_no_change']),
            'warm_start': str(kwargs['warm_start']),
            'average': str(kwargs['average']),
            'training_error_mape': str(mean_absolute_percentage_error(dr.train_y, train_pred_y)),
            'training_error_rmse': str(root_mean_squared_error(dr.train_y, train_pred_y)),
            'testing_error_mape': str(mean_absolute_percentage_error(dr.test_y, pred_y)),
            'testing_error_rmse': str(root_mean_squared_error(dr.test_y, pred_y)),
            'train_path': str(train_path),
            'test_path': str(test_path),
        }


from sklearn.ensemble import AdaBoostRegressor
from sklearn.tree import DecisionTreeRegressor


class AdaBoostProcessor(InformalProcessorInterface):

    def process(self, train_path: str, test_path: str, **kwargs):
        dr = DataFrameReader(train_path, test_path)
        adaboost = AdaBoostRegressor(
            DecisionTreeRegressor(
                criterion=kwargs['criterion'],
                splitter=kwargs['splitter'],
                max_depth=kwargs['max_depth'],
                min_samples_split=kwargs['min_samples_split'],
                min_samples_leaf=kwargs['min_samples_leaf'],
                min_weight_fraction_leaf=kwargs['min_weight_fraction_leaf'],
                max_features=kwargs['max_features'],
                max_leaf_nodes=kwargs['max_leaf_nodes'],
                min_impurity_decrease=kwargs['min_impurity_decrease'],
                min_impurity_split=kwargs['min_impurity_split'],
                presort=kwargs['presort'],
                ccp_alpha=kwargs['ccp_alpha'],

            ),
            n_estimators=kwargs['n_estimators'],
            learning_rate=kwargs['learning_rate'],
            loss=kwargs['loss'],
        )
        start_time = time.time()
        adaboost.fit(dr.train_X, dr.train_y)
        print("--- %s seconds ---" % (time.time() - start_time))
        train_pred_y = adaboost.predict(dr.train_X)
        pred_y = adaboost.predict(dr.test_X)

        stats = dict(kwargs)
        stats['training_error_mape'] = str(mean_absolute_percentage_error(dr.train_y, train_pred_y))
        stats['training_error_rmse'] = str(root_mean_squared_error(dr.train_y, train_pred_y))
        stats['testing_error_mape'] = str(mean_absolute_percentage_error(dr.test_y, pred_y))
        stats['testing_error_rmse'] = str(root_mean_squared_error(dr.test_y, pred_y))
        stats['train_path'] = str(train_path)
        stats['test_path'] = str(test_path)
        return stats


from sklearn.ensemble import RandomForestRegressor


class RandomForestProcessor(InformalProcessorInterface):

    def process(self, train_path: str, test_path: str, **kwargs):
        dr = DataFrameReader(train_path, test_path)

        regr = RandomForestRegressor(
            n_estimators=kwargs['n_estimators'],
            criterion=kwargs['criterion'],
            max_depth=kwargs['max_depth'],
            min_samples_split=kwargs['min_samples_split'],
            min_samples_leaf=kwargs['min_samples_leaf'],
            min_weight_fraction_leaf=kwargs['min_weight_fraction_leaf'],
            max_features=kwargs['max_features'],
            max_leaf_nodes=kwargs['max_leaf_nodes'],
            min_impurity_decrease=kwargs['min_impurity_decrease'],
            min_impurity_split=kwargs['min_impurity_split'],
            bootstrap=kwargs['bootstrap'],
            oob_score=kwargs['oob_score'],
            n_jobs=kwargs['n_jobs'],
            verbose=kwargs['verbose'],
            warm_start=kwargs['warm_start'],
            ccp_alpha=kwargs['ccp_alpha'],
            max_samples=kwargs['max_samples'],
        )
        start_time = time.time()
        regr.fit(dr.train_X, dr.train_y)
        print("--- %s seconds ---" % (time.time() - start_time))
        train_pred_y = regr.predict(dr.train_X)
        pred_y = regr.predict(dr.test_X)

        stats = dict(kwargs)
        stats['training_error_mape'] = str(mean_absolute_percentage_error(dr.train_y, train_pred_y))
        stats['training_error_rmse'] = str(root_mean_squared_error(dr.train_y, train_pred_y))
        stats['testing_error_mape'] = str(mean_absolute_percentage_error(dr.test_y, pred_y))
        stats['testing_error_rmse'] = str(root_mean_squared_error(dr.test_y, pred_y))
        stats['train_path'] = str(train_path)
        stats['test_path'] = str(test_path)
        return stats


from sklearn.neural_network import MLPRegressor


class MLPProcessor(InformalProcessorInterface):
    # TODO IN VIEW array to tuple  in hidden_layer_sizes
    def process(self, train_path: str, test_path: str, **kwargs):
        dr = DataFrameReader(train_path, test_path)
        # hidden_layer_sizes = (100, 40, 20),
        # activation = 'relu',
        # solver = 'adam',
        # alpha = 0.0001,
        # batch_size = 'auto',
        # max_iter = 200

        mlp = MLPRegressor(
            hidden_layer_sizes=kwargs['hidden_layer_sizes'],
            activation=kwargs['activation'],
            solver=kwargs['solver'],
            alpha=kwargs['alpha'],
            batch_size=kwargs['batch_size'],
            learning_rate=kwargs['learning_rate'],
            learning_rate_init=kwargs['learning_rate_init'],
            power_t=kwargs['power_t'],
            max_iter=kwargs['max_iter'],
            shuffle=kwargs['shuffle'],
            tol=kwargs['tol'],
            verbose=kwargs['verbose'],
            warm_start=kwargs['warm_start'],
            momentum=kwargs['momentum'],
            nesterovs_momentum=kwargs['nesterovs_momentum'],
            early_stopping=kwargs['early_stopping'],
            validation_fraction=kwargs['validation_fraction'],
            beta_1=kwargs['beta_1'],
            beta_2=kwargs['beta_2'],
            epsilon=kwargs['epsilon'],
            n_iter_no_change=kwargs['n_iter_no_change'],
            max_fun=kwargs['max_fun'],
        )
        start_time = time.time()
        mlp.fit(dr.train_X, dr.train_y)
        print("--- %s seconds ---" % (time.time() - start_time))
        train_pred_y = mlp.predict(dr.train_X)
        pred_y = mlp.predict(dr.test_X)

        stats = dict(kwargs)
        stats['training_error_mape'] = str(mean_absolute_percentage_error(dr.train_y, train_pred_y))
        stats['training_error_rmse'] = str(root_mean_squared_error(dr.train_y, train_pred_y))
        stats['testing_error_mape'] = str(mean_absolute_percentage_error(dr.test_y, pred_y))
        stats['testing_error_rmse'] = str(root_mean_squared_error(dr.test_y, pred_y))
        stats['train_path'] = str(train_path)
        stats['test_path'] = str(test_path)
        return stats
