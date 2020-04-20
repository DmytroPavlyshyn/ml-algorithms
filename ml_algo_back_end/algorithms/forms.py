from django import forms


# TODO REWRITE ALL FORMS ON SERIALIZERS

class BaseForm(forms.Form):
    train_path = forms.CharField(max_length=250)
    test_path = forms.CharField(max_length=250)


class GrrnForm(BaseForm):
    sigma = forms.FloatField()
    # tmp = forms.ChoiceField(choices=[
    #     ("one", "one"),
    #     ("two", "two"),
    #     ("three", "three")
    # ])


class SvrForm(BaseForm):
    kernel = forms.CharField(max_length=250)
    gamma = forms.CharField(max_length=250)
    coef0 = forms.FloatField()
    epsilon = forms.FloatField()
    max_iter = forms.IntegerField()
    degree = forms.IntegerField()
    tol = forms.FloatField()
    C = forms.FloatField()
    shrinking = forms.BooleanField(initial=False, required=False)
    cache_size = forms.IntegerField()
    verbose = forms.BooleanField(initial=False, required=False)


class SgdForm(BaseForm):
    loss = forms.CharField(max_length=250)
    penalty = forms.CharField(max_length=250)
    alpha = forms.FloatField()
    l1_ratio = forms.FloatField()
    fit_intercept = forms.BooleanField(initial=False, required=False)
    max_iter = forms.IntegerField()
    tol = forms.FloatField()
    shuffle = forms.BooleanField(initial=False, required=False)
    verbose = forms.IntegerField()
    epsilon = forms.FloatField()
    learning_rate = forms.CharField(max_length=250)
    eta0 = forms.FloatField()
    power_t = forms.FloatField()
    early_stopping = forms.BooleanField(initial=False, required=False)
    validation_fraction = forms.FloatField()
    n_iter_no_change = forms.IntegerField()
    warm_start = forms.BooleanField(initial=False, required=False)
    average = forms.BooleanField(initial=False, required=False)


class AdaBoostForm(BaseForm):
    criterion = forms.CharField(max_length=250)
    splitter = forms.CharField(max_length=250)
    max_depth = forms.IntegerField(required=False)
    min_samples_split = forms.IntegerField()
    min_samples_leaf = forms.IntegerField()
    min_weight_fraction_leaf = forms.FloatField()
    max_features = forms.CharField(required=False)
    max_leaf_nodes = forms.IntegerField(required=False)
    min_impurity_decrease = forms.FloatField()
    min_impurity_split = forms.FloatField(required=False)
    presort = forms.CharField(max_length=250)
    ccp_alpha = forms.FloatField()
    n_estimators = forms.IntegerField()
    learning_rate = forms.FloatField()
    loss = forms.CharField(max_length=250)


# TODO RANDOM FOREST FORM HAS FORGOT
class RandomForestForm(BaseForm):
    n_estimators = forms.IntegerField()
    criterion = forms.CharField(max_length=250)
    max_depth = forms.IntegerField(required=False)
    # TODO LOGIC FOR FLOATS
    min_samples_split = forms.IntegerField()
    min_samples_leaf = forms.IntegerField()
    min_weight_fraction_leaf = forms.FloatField()
    max_features = forms.CharField(max_length=250)
    max_leaf_nodes = forms.IntegerField(required=False)
    min_impurity_decrease = forms.FloatField()
    min_impurity_split = forms.FloatField(required=False)
    bootstrap = forms.BooleanField(initial=False, required=False)
    oob_score = forms.BooleanField(initial=False, required=False)
    n_jobs = forms.IntegerField(required=False)
    random_state = forms.IntegerField(required=False)
    verbose = forms.IntegerField()
    warm_start = forms.BooleanField(initial=False, required=False)
    ccp_alpha = forms.FloatField()
    max_samples = forms.IntegerField(required=False)


from django.contrib.postgres.forms import SimpleArrayField


class MlpForm(BaseForm):
    hidden_layer_sizes = SimpleArrayField(forms.IntegerField())
    activation = forms.CharField(max_length=250)
    solver = forms.CharField(max_length=250)
    alpha = forms.FloatField()
    batch_size = forms.CharField(max_length=250)
    learning_rate = forms.CharField(max_length=250)
    learning_rate_init = forms.FloatField()
    power_t = forms.FloatField()
    max_iter = forms.IntegerField()
    shuffle = forms.BooleanField(initial=False, required=False)
    tol = forms.FloatField()
    verbose = forms.BooleanField(initial=False, required=False)
    warm_start = forms.BooleanField(initial=False, required=False)
    momentum = forms.FloatField()
    nesterovs_momentum = forms.BooleanField(initial=False, required=False)
    early_stopping = forms.BooleanField(initial=False, required=False)
    validation_fraction = forms.FloatField()
    beta_1 = forms.FloatField()
    beta_2 = forms.FloatField()
    epsilon = forms.FloatField()
    n_iter_no_change = forms.IntegerField()
    max_fun = forms.IntegerField()
