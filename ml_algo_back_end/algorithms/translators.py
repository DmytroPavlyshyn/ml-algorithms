""" Translators are used to cast parameters
that can have more than one language specific type
"""


def translate_grrm(form):
    return form


def translate_svr(form):
    form.validated_data['gamma'] = map_try_cast(
        form.validated_data['gamma'],
        [float, str]
    )
    return form


def translate_sgd(form):
    form.validated_data['average'] = map_try_cast(
        form.validated_data['average'],
        [to_bool, int]
    )
    return form


def translate_ada_boost(form):
    form.validated_data['min_samples_split'] = map_try_cast(
        form.validated_data['min_samples_split'],
        [int, float]
    )
    form.validated_data['min_samples_leaf'] = map_try_cast(
        form.validated_data['min_samples_leaf'],
        [int, float]
    )
    form.validated_data['max_features'] = map_try_cast(
        form.validated_data['max_features'],
        [int, float, str]
    )

    return form


def translate_random_forest(form):
    form.validated_data['min_samples_split'] = map_try_cast(
        form.validated_data['min_samples_split'],
        [int, float]
    )
    form.validated_data['min_samples_leaf'] = map_try_cast(
        form.validated_data['min_samples_leaf'],
        [int, float]
    )
    form.validated_data['max_features'] = map_try_cast(
        form.validated_data['max_features'],
        [int, float, str]
    )
    form.validated_data['max_samples'] = map_try_cast(
        form.validated_data['max_samples'],
        [int, float]
    )

    return form


def translate_mlp(form):
    form.validated_data['hidden_layer_sizes'] = tuple(form.validated_data['hidden_layer_sizes'])
    form.validated_data['batch_size'] = map_try_cast(
        form.validated_data['batch_size'],
        [int, str]
    )
    return form


def try_cast(_fun, _el: str):
    if _el is None:
        return None
    try:
        return _fun(_el)
    except ValueError:
        return None


def map_try_cast(field, fun_list):
    for fun in fun_list:
        result = try_cast(fun, field)
        if result is not None:
            return result
    return None


def to_bool(string):
    if string == 'true':
        return True
    elif string == 'false':
        return False
    else:
        raise ValueError
