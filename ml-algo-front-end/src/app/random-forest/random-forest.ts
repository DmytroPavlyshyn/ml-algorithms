export interface RandomForest {
    train_path: string;
    test_path: string;
    n_estimators: number;
    criterion: string;
    max_depth: number;
    min_samples_split: string;  // int, float
    min_samples_leaf: string;  // int, float
    min_weight_fraction_leaf: number;
    max_features: string;  // int, float, string
    max_leaf_nodes: number;
    min_impurity_decrease: number;
    min_impurity_split: number;
    bootstrap: boolean;
    oob_score: boolean;
    n_jobs: number;
    verbose: number;
    warm_start: boolean;
    ccp_alpha: number; // float > 0.0
    max_samples: string; // int or float
    use_wiener: boolean;
    wiener_n: number;
}
