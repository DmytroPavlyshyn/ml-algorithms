import pandas as pd


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
