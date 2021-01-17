export interface Mlp {
    train_path: string;
    test_path: string;
    hidden_layer_sizes: Array<number>;
    activation: string;
    solver: string;
    alpha: number;
    batch_size: string;  // int or string
    learning_rate: string;
    learning_rate_init: number;
    power_t: number;
    max_iter: number;
    shuffle: boolean;
    tol: number;
    verbose: boolean;
    warm_start: boolean;
    momentum: number;
    nesterovs_momentum: boolean;
    early_stopping: boolean;
    validation_fraction: number;
    beta_1: number;
    beta_2: number;
    epsilon: number;
    n_iter_no_change: number;
    max_fun: number;
    use_wiener: boolean;
    wiener_n: number;
}
