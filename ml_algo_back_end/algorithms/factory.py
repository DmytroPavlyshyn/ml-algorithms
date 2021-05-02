import inspect

from sklearn.tree import DecisionTreeRegressor

from sklearn.svm import SVR


class RegressorFactory:
    @staticmethod
    def create(payload):
        type = payload['type']
        if type == 'svr':
            return RegressorFactory.create_svr(payload['arguments'])
        # {
        #     'svr': self.create_svr(payload['arguments']),
        #     'sgd': self.create_svr(payload['arguments']),
        #     'ada-boost': self.create_svr(payload['arguments']),
        #     'random-forest': self.create_svr(payload['arguments']),
        #     'mlp': {}
        # }

    @staticmethod
    def create_svr(arguments):
        return SVR(**arguments);
    # def create_sgd(self, arguments):
    #
    # def create_ada_boost(self, arguments):
    #
    # def create_random_forest(self, arguments):
    #
    # def create_mlp(self, arguments):
