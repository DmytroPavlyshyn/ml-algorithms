import pandas as pd
from sklearn.base import ClassifierMixin, BaseEstimator


class WienerPolynomialFeatures:

    def E(self, res, f, t, n, d=[]):
        for i in range(f, t):
            if (len(d) < n - 1):
                a = d.copy()
                a.append(i)
                self.E(res, i, t, n, a)
            else:
                a = d.copy()
                a.append(i)
                res.append(a)

    def calculate(self, res, l, n):
        for i in range(1, n + 1):
            self.E(res, 0, l, i)

    def calc_row(self, calc_x, x):
        res = []
        for i in range(len(calc_x)):
            item = 1
            for j in range(len(calc_x[i])):
                item *= x[calc_x[i][j]]
            res.append(item)
        return res

    def fit(self, table, n):
        tbl = table.values
        res = []
        row = []
        self.calculate(row, len(tbl[0]) - 1, n)
        for i in range(len(tbl)):
            new_row = self.calc_row(row, tbl[i][:len(tbl[0]) - 1])
            new_row.append(tbl[i][-1])
            res.append(new_row)
        return pd.DataFrame(data=res)

import numpy as np

class MaxScaler(BaseEstimator, ClassifierMixin):

    def __init__(self, name="MaxScaler"):
        self.name = name

    def fit(self, X):
        self.max_elements = np.amax(X, axis=0)
        return self

    def transform(self, X):
        scaledX = X / self.max_elements
        return scaledX


def main():
    df_train = pd.read_csv('/Users/dmytropavlyshyn/Study/datasets/trainCO.txt', header=None)
    df_test = pd.read_csv('/Users/dmytropavlyshyn/Study/datasets/testCO.txt', header=None)

    train_size = len(df_train)

    train_X = df_train.iloc[:, :-1]
    train_y = df_train.iloc[:, -1]
    test_X = df_test.iloc[:, :-1]
    test_y = df_test.iloc[:, -1]

    scaler = MaxScaler()
    scaler.fit(train_X)

    mtrain_X = scaler.transform(train_X)
    mtest_X = scaler.transform(test_X)
    wp_features = WienerPolynomialFeatures()
    _test_X = wp_features.fit(mtest_X, 2)
    _test_X


if __name__ == '__main__':
    main()
