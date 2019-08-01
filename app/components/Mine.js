// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';

type Props = {};

export default class Mine extends Component<Props> {
  props: Props;

  render() {
    return (
      <div >
        <h2>Home</h2>
        {/*<Link to={routes.COUNTER} replace>to Counter</Link>*/}
      </div>
    );
  }
}
