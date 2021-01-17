import { Component, OnInit } from '@angular/core';

export interface AlgorithmNameRoute {
  name: string;
  route: string;
}

@Component({
  selector: 'app-algorithm-list',
  templateUrl: './algorithm-list.component.html',
  styleUrls: ['./algorithm-list.component.css']
})
export class AlgorithmListComponent implements OnInit {

  algorithms: Array<AlgorithmNameRoute> = [
    { name: 'General regression neural network', route: 'grrn' },
    { name: 'Epsilon-Support Vector Regression', route: 'svr' },
    { name: 'Stochastic Gradient Descent', route: 'sgd' },
    { name: 'Ada Boost', route: 'ada-boost' },
    { name: 'Random Forest', route: 'random-forest' },
    { name: 'Multi-layer Perceptron', route: 'mlp' },
    { name: 'All algorithms', route: 'all-algos' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
