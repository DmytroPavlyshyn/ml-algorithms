import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';

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
    {name: 'Epsilon-Support Vector Regression', route: 'test-algo'},
    {name: 'Stochastic Gradient Descent', route: 'sgd'},
    {name: 'Adaptive Boosting', route: 'ada-boost'},
    {name: 'Random forest', route: 'random-forest'},
    {name: 'Multi-layer Perceptron', route: 'mlp'},
  ];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    console.log(this.userService.isAuthenticated());
  }

}
