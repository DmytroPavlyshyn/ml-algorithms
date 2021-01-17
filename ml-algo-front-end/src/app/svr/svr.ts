export interface Svr {
    train_path: string;
    test_path: string;
    kernel: string;
    gamma: string;
    coef0: number;
    epsilon: number;
    max_iter: number;
    degree: number;
    tol: number;
    C: number;
    shrinking: boolean;
    cache_size: number;
    verbose: boolean;
    use_wiener: boolean;
    wiener_n: number;
}
