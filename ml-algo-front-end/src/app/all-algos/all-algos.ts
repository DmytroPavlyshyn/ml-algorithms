import { Grrn } from '../grrn/grrn';
import { Sgd } from '../sgd/sgd';
import { Svr } from '../svr/svr';
import { AdaBoost } from '../ada-boost/ada-boost';
import { RandomForest } from '../random-forest/random-forest';
import { Mlp } from '../mlp/mlp';

export interface AllAlgos {
    train_path: string;
    test_path: string;
    grrn: Grrn;
    sgd: Sgd;
    svr: Svr;
    adaBoost: AdaBoost;
    randomForest: RandomForest;
    mlp: Mlp;
}