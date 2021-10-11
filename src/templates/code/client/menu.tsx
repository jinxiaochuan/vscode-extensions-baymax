import React, { Component } from 'react';
import { withRouter, WithRouterProps } from 'react-router';
import { Menu } from 'zent';
import MENUS from './constants/menus';
import './style.scss';

const { MenuItem } = Menu;

interface IProps {}

interface IState {}

class LayoutMenu extends Component<IProps & WithRouterProps, IState> {
  public render() {
    return (
      <div className="vscode-snippets">
        <div className="vscode-snippets-sidebar">
          <div className="vscode-snippets-sidebar-title">vscode-snippets</div>
          <Menu onClick={this.onMenuChange} mode="inline">
            {MENUS.map(menu => <MenuItem key={menu.key}>{menu.name}</MenuItem>)}
          </Menu>
        </div>
        <div className="vscode-snippets-content">{this.props.children}</div>
      </div>
    );
  }

  private onMenuChange = (e, activeMenu) => {
    this.props.router.push(`/${activeMenu}`);
  };
}

export default withRouter<IProps>(LayoutMenu);
