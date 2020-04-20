from rest_framework import serializers


class BaseForm(serializers.Serializer):
    train_path = serializers.CharField(max_length=250)
    test_path = serializers.CharField(max_length=250)


class GrrnForm(BaseForm):
    sigma = serializers.FloatField()


class SvrForm(BaseForm):
    kernel = serializers.CharField(max_length=250)
    gamma = serializers.CharField(max_length=250)
    coef0 = serializers.FloatField()
    epsilon = serializers.FloatField()
    max_iter = serializers.IntegerField()
    degree = serializers.IntegerField()
    tol = serializers.FloatField()
    C = serializers.FloatField()
    shrinking = serializers.BooleanField(initial=False, required=False)
    cache_size = serializers.IntegerField()
    verbose = serializers.BooleanField(initial=False, required=False)


class SgdForm(BaseForm):
    loss = serializers.CharField(max_length=250)
    penalty = serializers.CharField(max_length=250)
    alpha = serializers.FloatField()
    l1_ratio = serializers.FloatField()
    fit_intercept = serializers.BooleanField(initial=False, required=False)
    max_iter = serializers.IntegerField()
    tol = serializers.FloatField()
    shuffle = serializers.BooleanField(initial=False, required=False)
    verbose = serializers.IntegerField()
    epsilon = serializers.FloatField()
    learning_rate = serializers.CharField(max_length=250)
    eta0 = serializers.FloatField()
    power_t = serializers.FloatField()
    early_stopping = serializers.BooleanField(initial=False, required=False)
    validation_fraction = serializers.FloatField()
    n_iter_no_change = serializers.IntegerField()
    warm_start = serializers.BooleanField(initial=False, required=False)
    average = serializers.BooleanField(initial=False, required=False)


class AdaBoostForm(BaseForm):
    criterion = serializers.CharField(max_length=250)
    splitter = serializers.CharField(max_length=250)
    max_depth = serializers.IntegerField(required=False)
    min_samples_split = serializers.IntegerField()
    min_samples_leaf = serializers.IntegerField()
    min_weight_fraction_leaf = serializers.FloatField()
    max_features = serializers.CharField(required=False)
    max_leaf_nodes = serializers.IntegerField(required=False)
    min_impurity_decrease = serializers.FloatField()
    min_impurity_split = serializers.FloatField(required=False)
    presort = serializers.CharField(max_length=250)
    ccp_alpha = serializers.FloatField()
    n_estimators = serializers.IntegerField()
    learning_rate = serializers.FloatField()
    loss = serializers.CharField(max_length=250)


# TODO RANDOM FOREST FORM HAS FORGOT
class RandomForestForm(BaseForm):
    n_estimators = serializers.IntegerField()
    criterion = serializers.CharField(max_length=250)
    max_depth = serializers.IntegerField(required=False)
    # TODO LOGIC FOR FLOATS
    min_samples_split = serializers.IntegerField()
    min_samples_leaf = serializers.IntegerField()
    min_weight_fraction_leaf = serializers.FloatField()
    max_features = serializers.CharField(max_length=250)
    max_leaf_nodes = serializers.IntegerField(required=False)
    min_impurity_decrease = serializers.FloatField()
    min_impurity_split = serializers.FloatField(required=False)
    bootstrap = serializers.BooleanField(initial=False, required=False)
    oob_score = serializers.BooleanField(initial=False, required=False)
    n_jobs = serializers.IntegerField(required=False)
    random_state = serializers.IntegerField(required=False)
    verbose = serializers.IntegerField()
    warm_start = serializers.BooleanField(initial=False, required=False)
    ccp_alpha = serializers.FloatField()
    max_samples = serializers.IntegerField(required=False)


from django.contrib.postgres.forms import SimpleArrayField


class MlpForm(BaseForm):

    hidden_layer_sizes = serializers.ListField(child=serializers.IntegerField())
    activation = serializers.CharField(max_length=250)
    solver = serializers.CharField(max_length=250)
    alpha = serializers.FloatField()
    batch_size = serializers.CharField(max_length=250)
    learning_rate = serializers.CharField(max_length=250)
    learning_rate_init = serializers.FloatField()
    power_t = serializers.FloatField()
    max_iter = serializers.IntegerField()
    shuffle = serializers.BooleanField(initial=False, required=False)
    tol = serializers.FloatField()
    verbose = serializers.BooleanField(initial=False, required=False)
    warm_start = serializers.BooleanField(initial=False, required=False)
    momentum = serializers.FloatField()
    nesterovs_momentum = serializers.BooleanField(initial=False, required=False)
    early_stopping = serializers.BooleanField(initial=False, required=False)
    validation_fraction = serializers.FloatField()
    beta_1 = serializers.FloatField()
    beta_2 = serializers.FloatField()
    epsilon = serializers.FloatField()
    n_iter_no_change = serializers.IntegerField()
    max_fun = serializers.IntegerField()
