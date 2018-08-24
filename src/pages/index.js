import { PureComponent } from 'react';
import styles from './index.css';
import { connect } from 'dva';
import fooModel from '../models/foo';

const { namespace } = fooModel;

const mapStateToProps = (state) => {
  const { dogImgURL } = state[namespace];
  return { dogImgURL };
};

@connect(mapStateToProps)
export default class IndexPage extends PureComponent {
  render() {
    return (
      <div>
        <div className={styles.normal}>
          <h1>Show random dog picture</h1>
        </div>
        <div>
          <img src={this.props.dogImgURL} alt="dog image" height="300" />
        </div>
      </div>
    );
  }
}
