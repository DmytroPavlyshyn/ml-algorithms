import inspect

from sklearn.ensemble import AdaBoostRegressor, RandomForestRegressor
from sklearn.linear_model import SGDRegressor
from sklearn.svm import SVR
from sklearn.neural_network import MLPRegressor
from sklearn.tree import DecisionTreeRegressor


class RegressorFactory:
    @staticmethod
    def create(payload):
        type = payload['type']
        if type == 'svr':
            return RegressorFactory.create_svr(payload['arguments']['arguments'])
        elif type == 'sgd':
            return RegressorFactory.create_sgd(payload['arguments']['arguments'])
        elif type == 'ada-boost':
            return RegressorFactory.create_adaboost(
                payload['arguments']['ada_boost_args'],
                payload['arguments']['decision_tree_args']
            )
        elif type == 'random-forest':
            return RegressorFactory.create_random_forest(
                payload['arguments']['arguments']
            )
        elif type == 'mlp':
            return RegressorFactory.create_mlp(payload['arguments']['arguments'])

    @staticmethod
    def create_svr(arguments):
        return SVR(**arguments)

    @staticmethod
    def create_sgd(arguments):
        return SGDRegressor(**arguments)

    @staticmethod
    def create_mlp(arguments):
        return MLPRegressor(**arguments)

    @staticmethod
    def create_adaboost(ada_boost_args, decision_tree_args):
        return AdaBoostRegressor(
            base_estimator=DecisionTreeRegressor(
                **decision_tree_args
            ),
            **ada_boost_args
        )

    @staticmethod
    def create_random_forest(arguments):
        return RandomForestRegressor(**arguments)
