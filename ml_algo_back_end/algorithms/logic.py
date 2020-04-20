#!/usr/bin/env python
# coding: utf-8

# In[3]:


import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import PolynomialFeatures
from sklearn.cluster import DBSCAN
from sklearn.cluster import AffinityPropagation
from sklearn.cluster import KMeans
from sklearn import metrics
import math
import time
from sklearn.metrics import mean_squared_error

# In[4]:


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


# In[5]:


df_train = pd.read_csv('d:/target/trainCO.txt', header=None)
df_test = pd.read_csv('d:/target/testCO.txt', header=None)

train_size = len(df_train)

train_X = df_train.iloc[:, :-1]
train_y = df_train.iloc[:, -1]
test_X = df_test.iloc[:, :-1]
test_y = df_test.iloc[:, -1]

# In[6]:


scaler = MaxScaler()
scaler.fit(train_X)
train_X = scaler.transform(train_X)
test_X = scaler.transform(test_X)


# In[7]:


# оця частинка коду буде замінена. Або ти зробиш, або тобі дадуть.

poly = PolynomialFeatures(2)
train_X = poly.fit_transform(train_X)
test_X = poly.fit_transform(test_X)


# In[10]:


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


# In[12]:


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


# In[57]:


# np.savetxt('C:/Users/User/Desktop/gtm/GTM_PR.csv', pred_y, delimiter=',', fmt='%1.5f')


# In[19]:


for s in np.arange(0.1, 0.3, 0.1):
    grnn = GRNN(sigma=s)
    start_time = time.time()
    predictions = np.apply_along_axis(lambda i: grnn.predict(i, train_X, train_y), axis=1, arr=test_X)
    print("--- %s seconds ---" % (time.time() - start_time))
    print("Sigma: " + str(s))
    print('Testing errors:')
    print("MAPE: " + str(mean_absolute_percentage_error(test_y, predictions)))
    print("RMSE: " + str(root_mean_squared_error(test_y, predictions)))
    print()

# In[59]:


# np.savetxt('C:/Users/User/Desktop/gtm/GRNN.csv', pred_y, delimiter=',', fmt='%1.5f')


# In[29]:


from sklearn.svm import SVR

svr = SVR(kernel='rbf', gamma='auto', coef0=0.0, epsilon=0.001, max_iter=200)
start_time = time.time()
svr.fit(train_X, train_y)
print("--- %s seconds ---" % (time.time() - start_time))
train_pred_y = svr.predict(train_X)
pred_y = svr.predict(test_X)

print("training_error_mape: " + str(mean_absolute_percentage_error(train_y, train_pred_y)))
print("training_error_rmse: " + str(root_mean_squared_error(train_y, train_pred_y)))
print("testing_error_mape: " + str(mean_absolute_percentage_error(test_y, pred_y)))
print("testing_error_rmse: " + str(root_mean_squared_error(test_y, pred_y)))

# {
#     "training_errors": {
#         "mape": "some_value",
#         "rmse": "some_value"
#     },
#     "testing_errors": {
#         "mape": "some_value",
#         "rmse": "some_value"
#     }
# }

# In[61]:


# np.savetxt('C:/Users/User/Desktop/gtm/SVM.csv', pred_y, delimiter=',', fmt='%1.5f')


# In[22]:


from sklearn.linear_model import SGDRegressor

sgd = SGDRegressor(loss='squared_loss', alpha=0.0001)
start_time = time.time()
sgd.fit(train_X, train_y)
print("--- %s seconds ---" % (time.time() - start_time))
train_pred_y = sgd.predict(train_X)
pred_y = sgd.predict(test_X)

print('Training erros:')
print("MAPE: " + str(mean_absolute_percentage_error(train_y, train_pred_y)))
print("RMSE: " + str(root_mean_squared_error(train_y, train_pred_y)))
print()
print('Testing errors:')
print("MAPE: " + str(mean_absolute_percentage_error(test_y, pred_y)))
print("RMSE: " + str(root_mean_squared_error(test_y, pred_y)))

# In[63]:


# np.savetxt('C:/Users/User/Desktop/gtm/LR+Grad+PI.csv', pred_y, delimiter=',', fmt='%1.5f')


# In[23]:


from sklearn.ensemble import AdaBoostRegressor
from sklearn.tree import DecisionTreeRegressor

adaboost = AdaBoostRegressor(DecisionTreeRegressor(max_depth=4),
                             n_estimators=300)
start_time = time.time()
adaboost.fit(train_X, train_y)
print("--- %s seconds ---" % (time.time() - start_time))
train_pred_y = adaboost.predict(train_X)
pred_y = adaboost.predict(test_X)

print('Training erros:')
print("MAPE: " + str(mean_absolute_percentage_error(train_y, train_pred_y)))
print("RMSE: " + str(root_mean_squared_error(train_y, train_pred_y)))
print()
print('Testing errors:')
print("MAPE: " + str(mean_absolute_percentage_error(test_y, pred_y)))
print("RMSE: " + str(root_mean_squared_error(test_y, pred_y)))

# In[65]:


# np.savetxt('C:/Users/User/Desktop/gtm/AdaBoost.csv', pred_y, delimiter=',', fmt='%1.5f')


# In[24]:


from sklearn.ensemble import RandomForestRegressor

regr = RandomForestRegressor(max_depth=5, random_state=0)
start_time = time.time()
regr.fit(train_X, train_y)
print("--- %s seconds ---" % (time.time() - start_time))
train_pred_y = regr.predict(train_X)
pred_y = regr.predict(test_X)

print('Training erros:')
print("MAPE: " + str(mean_absolute_percentage_error(train_y, train_pred_y)))
print("RMSE: " + str(root_mean_squared_error(train_y, train_pred_y)))
print()
print('Testing errors:')
print("MAPE: " + str(mean_absolute_percentage_error(test_y, pred_y)))
print("RMSE: " + str(root_mean_squared_error(test_y, pred_y)))

# In[67]:


# np.savetxt('C:/Users/User/Desktop/gtm/RandomForest.csv', pred_y, delimiter=',', fmt='%1.5f')


# In[25]:


from sklearn.neural_network import MLPRegressor

mlp = MLPRegressor(hidden_layer_sizes=(100, 40, 20), activation='relu', solver='adam', alpha=0.0001, batch_size='auto',
                   max_iter=200)
start_time = time.time()
mlp.fit(train_X, train_y)
print("--- %s seconds ---" % (time.time() - start_time))
train_pred_y = mlp.predict(train_X)
pred_y = mlp.predict(test_X)

print('Training erros:')
print("MAPE: " + str(mean_absolute_percentage_error(train_y, train_pred_y)))
print("RMSE: " + str(root_mean_squared_error(train_y, train_pred_y)))
print()
print('Testing errors:')
print("MAPE: " + str(mean_absolute_percentage_error(test_y, pred_y)))
print("RMSE: " + str(root_mean_squared_error(test_y, pred_y)))

# In[69]:


# np.savetxt('C:/Users/User/Desktop/gtm/MPL.csv', pred_y, delimiter=',', fmt='%1.5f')
