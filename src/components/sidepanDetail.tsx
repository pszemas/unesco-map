import * as React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Monument, State as StateRoot } from '../reducers/index';
import { StyleSheet, css } from 'aphrodite/no-important';
import * as moment from 'moment';
import Slider from './slider';
import { colors } from '../style';
import Back from '../icons/back';
import Fullscreen from './fullscreen';

export interface Props {
  monument: Monument;
}

interface State {
  isFullscreen: boolean;
}

export interface RouteProps {
  id: string;
}

const styles = StyleSheet.create({
  container: {
    width: 520,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  monumentDetails: {
    padding: '20px 32px',
    flex: 1
  },
  leading: {
    color: colors.darkBlue
  },
  title: {
    color: colors.darkBlue,
    fontSize: 24,
    lineHeight: '32px',
    padding: '4px 0px'
  },
  region: {
    color: colors.grey,
    fontWeight: 400
  },
  description: {
    fontSize: 16,
    fontWeight: 300,
    color: colors.darkBlue,
    marginTop: 12,
    lineHeight: '22px'
  },
  maxDescription: {
    maxHeight: 230,
    overflow: 'auto'
  },
  footer: {
    backgroundColor: colors.brokenWhite,
    height: 56,
    display: 'flex',
    alignItems: 'center'
  },
  allSites: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 32,
    fontWeight: 400,
    cursor: 'pointer'
  },
  back: {
    marginRight: 4
  }
});

class SidepanDetail extends React.Component<Props, State> {

  public state = {
    isFullscreen: false
  };

  private onGoBack = () => {
    browserHistory.push('/');
  }

  private onFullScreen = () => {
    this.setState({
      isFullscreen: true
    });
  }

  private onDismissFullscreen = () => {
    this.setState({
      isFullscreen: false
    });
  }

  public render() {
    const { monument } = this.props;
    const { isFullscreen } = this.state;

    if (!monument) {
      return null;
    }

    const hasPictures = monument.pictures && monument.pictures.length > 0;

    return (
      <div className={css(styles.container)}>
        {
          isFullscreen && <Fullscreen pictures={monument.pictures} onDismissFullscreen={this.onDismissFullscreen}/>
        }
        <div>
          { hasPictures && <Slider pictures={monument.pictures} onFullScreen={this.onFullScreen}/> }
        </div>
        <div className={css(styles.monumentDetails)}>
          <div className={css(styles.leading)}>
            { monument.states }, { moment(monument.date_inscribed).format('YYYY') }
          </div>
          <h1 className={css(styles.title)}>{monument.site}</h1>
          <div className={css(styles.region)}>{ monument.region }</div>
          <div className={css(styles.description, hasPictures && styles.maxDescription)}>
            { monument.short_description }
          </div>
        </div>
        <div className={css(styles.footer)}>
          <div className={css(styles.allSites)} onClick={this.onGoBack}>
            <Back className={css(styles.back)}/>
            All sites
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state: StateRoot, props: any) => ({
  monument: state.monuments[props.params.id]
}))(SidepanDetail);
