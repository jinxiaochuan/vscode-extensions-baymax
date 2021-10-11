import React, { PureComponent } from 'react';
import { withRouter, WithRouterProps } from 'react-router';
import ApplicationBaseLayout from 'js/components/layout';
import Menu from './menu';

const BASENAME = '/vscode-snippets';

type IProps = ROUTER<{}>;

class Layout extends PureComponent<IProps & WithRouterProps> {
  public render() {
    return (
      <ApplicationBaseLayout onClickMenuItem={this.onClickMenuItem} basename={BASENAME}>
        <Menu>{this.props.children}</Menu>
      </ApplicationBaseLayout>
    );
  }

  public onClickMenuItem = (path, key, baseName) => {
    if (baseName !== BASENAME) {
      location.href = baseName + path;
    } else {
      this.props.router.push(path);
    }
  };
}

export default withRouter<IProps>(Layout);
