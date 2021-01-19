// steps 1, 2 & 3
// import React, {
//   Component
// } from 'react';
// step 4
import React, {
  Component, Suspense, lazy
} from 'react';

import loadable from '@loadable/component';

import './App.css';

import LoadingSpinner from './Components/spinner';

import Page1 from './Components/Page1';
// step 1
// import Page2 from './Components/Page2';
// import Page3 from './Components/Page3';

//import AsyncComponent from './Components/AsyncComponent';

// step 4
const P2Lazy = lazy(() => import('./Components/Page2'));
// const P3Lazy = lazy(() => import('./Components/Page3'));


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      route: 'page1',
      // component: null
    }
  }

  onRouteChange = (route) => {
    // step 1 & step 3
    this.setState({ route: route });
    // step 2
    // switch (route) {
    //   case 'page1':
    //     this.setState({
    //       route: route,
    //       component: Page1
    //     });
    //     return;
    //   case 'page2':
    //     import(`./Components/Page2`).then((Page2) => {
    //       this.setState({
    //         route: route,
    //         component: Page2.default
    //       });
    //     });
    //     return;
    //   case 'page3':
    //     import(`./Components/Page3`).then((Page3) => {
    //       this.setState({
    //         route: route,
    //         component: Page3.default
    //       });
    //     });
    //     return;
    //   default:
    //     this.setState({
    //       route: route,
    //       component: Page1
    //     });
    //     return;
    // };
  }

  render() {
    // step 2
    //   if (this.state.route === 'page1') {
    //     return <Page1 onRouteChange={this.onRouteChange} />
    //   } else {
    //     return <this.state.component onRouteChange={this.onRouteChange} />
    // }
    // step 3
    // if (this.state.route === 'page1') {
    //   return <Page1 onRouteChange = {
    //     this.onRouteChange
    //   }
    //   />
    // } else if (this.state.route === 'page2') {
    //   const AsyncPage2 = AsyncComponent(() => import('./Components/Page2'));
    //   return <AsyncPage2 onRouteChange = {
    //     this.onRouteChange
    //   }
    //   />
    // } else {
    //   const AsyncPage3 = AsyncComponent(() => import('./Components/Page3'));
    //   return <AsyncPage3 onRouteChange = {
    //     this.onRouteChange
    //   }
    //   />
    // }
    // step 4
    const AsyncPage = loadable(props => import(`./Components/${props.page}`));
    const AsyncComponent = loadable(props => import(`./Components/${props.component}`));    

    if (this.state.route === 'page1') {
      return <Page1 onRouteChange = {this.onRouteChange}/>
    } else if (this.state.route === 'page2') {
        return <Suspense fallback={<LoadingSpinner />}>
          <P2Lazy onRouteChange={this.onRouteChange} />
        </Suspense>
    } else if (this.state.route === 'page3') {
        return <Suspense fallback={<AsyncComponent component='spinner' />}>
          <AsyncPage page='Page3' onRouteChange={this.onRouteChange} />
        </Suspense>
    } else {
        return <Suspense fallback={<AsyncComponent component='spinner' />}>
          <AsyncPage page='Page4' onRouteChange={this.onRouteChange} />
        </Suspense>
    }

  };
}