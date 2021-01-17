export interface Sgd {
    train_path: string;
    test_path: string;
    loss: string;
    penalty: string;
    alpha: number;
    l1_ratio: number;
    fit_intercept: boolean;
    max_iter: number;
    tol: number;
    shuffle: boolean;
    verbose: number;
    epsilon: number;
    learning_rate: string;
    eta0: number;
    power_t: number;
    early_stopping: boolean;
    validation_fraction: number;
    n_iter_no_change: number;
    warm_start: boolean;
    average: string;
    use_wiener: boolean;
    wiener_n: number;
}
