from rest_framework import serializers


class BaseForm(serializers.Serializer):
    train_path = serializers.CharField(max_length=250)
    test_path = serializers.CharField(max_length=250)
    use_wiener = serializers.BooleanField(initial=False, required=False)
    wiener_n = serializers.IntegerField(initial=None, required=False, allow_null=True)


class GrrnForm(BaseForm):
    sigma = serializers.FloatField()

class SvrForm(BaseForm):
    kernel = serializers.CharField(max_length=250, required=False)  # string
    gamma = serializers.CharField(max_length=250, required=False)  # string, float
    coef0 = serializers.FloatField(required=False)  # float
    epsilon = serializers.FloatField(required=False)  # float
    max_iter = serializers.IntegerField(required=False)  # int
    degree = serializers.IntegerField(required=False)  # int
    tol = serializers.FloatField(required=False)  # float
    C = serializers.FloatField(required=False)  # float
    shrinking = serializers.BooleanField(initial=False, required=False)  # boolean
    cache_size = serializers.FloatField(required=False)  # float
    verbose = serializers.BooleanField(initial=False, required=False)  # boolean


class SgdForm(BaseForm):
    loss = serializers.CharField(max_length=250, required=False)
    penalty = serializers.CharField(max_length=250, required=False)
    alpha = serializers.FloatField(required=False)
    l1_ratio = serializers.FloatField(required=False)
    fit_intercept = serializers.BooleanField(initial=False, required=False)
    max_iter = serializers.IntegerField(required=False)
    tol = serializers.FloatField(required=False)
    shuffle = serializers.BooleanField(initial=False, required=False)
    verbose = serializers.IntegerField(required=False)
    epsilon = serializers.FloatField(required=False)
    learning_rate = serializers.CharField(max_length=250, required=False)
    eta0 = serializers.FloatField(required=False)
    power_t = serializers.FloatField(required=False)
    early_stopping = serializers.BooleanField(initial=False, required=False)
    validation_fraction = serializers.FloatField(required=False)
    n_iter_no_change = serializers.IntegerField(required=False)
    warm_start = serializers.BooleanField(initial=False, required=False)
    average = serializers.CharField(max_length=250, required=False)  # bool or int
    # TODO class_weight: dict, {class_label: weight} or "balanced", default=None


class AdaBoostForm(BaseForm):
    criterion = serializers.CharField(max_length=250, required=False)
    splitter = serializers.CharField(max_length=250, required=False)
    max_depth = serializers.IntegerField(required=False, allow_null=True)
    min_samples_split = serializers.CharField(max_length=250, required=False)  # int or float
    min_samples_leaf = serializers.CharField(max_length=250, required=False)  # int or float
    min_weight_fraction_leaf = serializers.FloatField(required=False)
    max_features = serializers.CharField(max_length=250, required=False, allow_null=True)  # int, float or string
    max_leaf_nodes = serializers.IntegerField(required=False, allow_null=True)
    min_impurity_decrease = serializers.FloatField(required=False)
    min_impurity_split = serializers.FloatField(required=False, allow_null=True)
    # DEPRECATED presort
    ccp_alpha = serializers.FloatField(required=False)  # float > 0.0
    n_estimators = serializers.IntegerField(required=False)
    learning_rate = serializers.FloatField(required=False)
    loss = serializers.CharField(max_length=250, required=False)


# TODO RANDOM FOREST FORM HAS FORGOT
class RandomForestForm(BaseForm):
    n_estimators = serializers.IntegerField(required=False)
    criterion = serializers.CharField(max_length=250, required=False)
    max_depth = serializers.IntegerField(required=False, allow_null=True)
    # TODO LOGIC FOR FLOATS
    min_samples_split = serializers.CharField(max_length=250, required=False)  # int, float
    min_samples_leaf = serializers.CharField(max_length=250, required=False)  # int, float
    min_weight_fraction_leaf = serializers.FloatField(required=False)
    max_features = serializers.CharField(max_length=250, required=False)  # int, float, string
    max_leaf_nodes = serializers.IntegerField(required=False, allow_null=True)
    min_impurity_decrease = serializers.FloatField(required=False)
    min_impurity_split = serializers.FloatField(required=False, allow_null=True)
    bootstrap = serializers.BooleanField(initial=False, required=False)
    oob_score = serializers.BooleanField(initial=False, required=False)
    n_jobs = serializers.IntegerField(required=False, allow_null=True)
    verbose = serializers.IntegerField(required=False)
    warm_start = serializers.BooleanField(initial=False, required=False)
    ccp_alpha = serializers.FloatField(required=False)  # float > 0.0
    max_samples = serializers.CharField(max_length=250, required=False, allow_null=True)  # int or float


class MlpForm(BaseForm):
    hidden_layer_sizes = serializers.ListField(child=serializers.IntegerField(), required=False)
    activation = serializers.CharField(max_length=250, required=False)
    solver = serializers.CharField(max_length=250, required=False)
    alpha = serializers.FloatField(required=False)
    batch_size = serializers.CharField(max_length=250, required=False)  # int or string 
    learning_rate = serializers.CharField(max_length=250, required=False)
    learning_rate_init = serializers.FloatField(required=False)
    power_t = serializers.FloatField(required=False)
    max_iter = serializers.IntegerField(required=False)
    shuffle = serializers.BooleanField(initial=True, required=False)
    tol = serializers.FloatField(required=False)
    verbose = serializers.BooleanField(initial=False, required=False)
    warm_start = serializers.BooleanField(initial=False, required=False)
    momentum = serializers.FloatField(required=False)
    nesterovs_momentum = serializers.BooleanField(initial=False, required=False)
    early_stopping = serializers.BooleanField(initial=False, required=False)
    validation_fraction = serializers.FloatField(required=False)
    beta_1 = serializers.FloatField(required=False)
    beta_2 = serializers.FloatField(required=False)
    epsilon = serializers.FloatField(required=False)
    n_iter_no_change = serializers.IntegerField(required=False)
    max_fun = serializers.IntegerField(required=False)

