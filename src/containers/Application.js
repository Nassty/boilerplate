import React from 'react';
import { AppBar, RadioButton, IconButton, Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';
import {connect} from 'react-redux';

import {toggleMenu, openMenu, closeMenu} from 'actions/menu';

const Application = ({menu, toggle, open, close}) => {
  return (
    <Layout>
      <NavDrawer active={menu} onOverlayClick={close}>
        <p>
          Navigation, account switcher, etc. go here.
        </p>
      </NavDrawer>
      <Panel>
        <AppBar><IconButton icon="menu" onClick={toggle} /></AppBar>
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
          <h1>Main Content</h1>
          <p>Main content goes here.</p>
          <RadioButton label="Closed" checked={!menu} onChange={close} />
          <RadioButton label="Open" checked={menu} onChange={open} />
        </div>
      </Panel>
      <Sidebar pinned={menu} width={5}>
        <div><IconButton icon="close" onClick={toggle} /></div>
        <div style={{ flex: 1 }}>
          <p>Supplemental content goes here.</p>
        </div>
      </Sidebar>
    </Layout>
  );
};

Application.propTypes = {
  menu: React.PropTypes.bool.isRequired,
  open: React.PropTypes.func.isRequired,
  close: React.PropTypes.func.isRequired,
  toggle: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({menu: state.menu});

const mapDispatchToProps = dispatch => ({
  open: () => dispatch(openMenu),
  close: () => dispatch(closeMenu),
  toggle: () => dispatch(toggleMenu),
});
export default connect(mapStateToProps, mapDispatchToProps)(Application);
