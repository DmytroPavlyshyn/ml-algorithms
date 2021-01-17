export interface AdaBoost {
    train_path: string;
    test_path: string;
    criterion: string;
    splitter: string;
    max_depth: number;
    min_samples_split: string;
    min_samples_leaf: string;
    min_weight_fraction_leaf: number;
    max_features: string;
    max_leaf_nodes: number;
    min_impurity_decrease: number;
    min_impurity_split: number;
    ccp_alpha: number;
    n_estimators: number;
    learning_rate: number;
    loss: string;
}
