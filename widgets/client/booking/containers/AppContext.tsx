import * as React from 'react';
import { sendEmail } from '../../form/containers/utils';
import { ISaveFormResponse } from '../../form/types';
import { IEmailParams } from '../../types';
import { connection } from '../connection';
import { IBooking, ICurrentStatus } from '../types';
import { saveBooking } from './utils';

interface IState {
  activeRoute: string;
  activeBooking: IBooking | null;
  activeBlock: string | null;
  activeFloor: string | null;
  activeProduct: string | null;
  isFormVisible: boolean;
  isPopupVisible: boolean;
  isSubmitting?: boolean;

  currentStatus: ICurrentStatus;
  callSubmit: boolean;
}

interface IStore extends IState {
  goToIntro: () => void;
  goToBooking: (booking: IBooking) => void;
  goToBookings: () => void;
  goToBlock: (blockId: string) => void;
  goToFloor: (floorId: string) => void;
  goToProduct: (productId: string) => void;
  getBooking: () => IBooking;
  showForm: () => void;
  showPopup: () => void;
  closePopup: () => void;
  createNew: () => void;
  sendEmail: (params: IEmailParams) => void;
  save: (params: any) => void;
  getIntegration: () => any;
}

const AppContext = React.createContext({} as IStore);

export const AppConsumer = AppContext.Consumer;

export class AppProvider extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      activeRoute: 'INTRO',
      activeBooking: null,
      activeBlock: null,
      activeFloor: null,
      activeProduct: null,
      isFormVisible: false,
      isPopupVisible: false,
      currentStatus: { status: 'INITIAL' },
      isSubmitting: false,
      callSubmit: false
    };
  }

  goToIntro = () => {
    this.setState({
      activeRoute: 'INTRO',
      activeBooking: null
    });
  };

  goToBooking = (booking: any) => {
    this.setState({
      activeRoute: 'BOOKING',
      activeBooking: booking
    });
  };

  goToBookings = () => {
    this.setState({
      activeRoute: 'BOOKING',
      activeBlock: null
    });
  };

  goToBlock = (blockId: any) => {
    this.setState({
      activeRoute: 'BLOCK_DETAIL',
      activeBlock: blockId
    });
  };

  goToFloor = (floorId: any) => {
    this.setState({
      activeRoute: 'FLOOR_DETAIL',
      activeFloor: floorId
    });
  };

  goToProduct = (productId: string) => {
    this.setState({
      activeRoute: 'PRODUCT_DETAIL',
      activeProduct: productId
    });
  };

  getBooking = () => {
    return connection.data.booking;
  };

  getIntegration = () => {
    return connection.data.integration;
  };

  showForm = () => {
    this.setState({
      isFormVisible: true
    });
  };

  /*
   * When load type is popup, Show popup and show one of callout and form
   */
  showPopup = () => {
    this.setState({ isPopupVisible: true });

    return this.setState({ isFormVisible: true });
  };

  /*
   * When load type is popup, Hide popup
   */
  closePopup = () => {
    this.setState({
      isPopupVisible: false,
      isFormVisible: false
    });
  };

  /*
   * Redisplay form component after submission
   */
  createNew = () => {
    this.setState({ currentStatus: { status: 'INITIAL' } });
  };

  /**
   * User submission
   */

  save = (doc: any) => {
    this.setState({ isSubmitting: true });

    saveBooking({
      doc,
      browserInfo: connection.browserInfo,
      integrationId: this.getIntegration()._id,
      formId: this.getIntegration().formId,
      saveCallback: (response: ISaveFormResponse) => {
        const { errors } = response;

        const status = response.status === 'ok' ? 'SUCCESS' : 'ERROR';

        postMessage({
          message: 'submitResponse',
          status
        });

        this.setState({
          callSubmit: false,
          isSubmitting: false,
          currentStatus: {
            status,
            errors
          }
        });
      }
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          goToBooking: this.goToBooking,
          goToIntro: this.goToIntro,
          goToBlock: this.goToBlock,
          goToBookings: this.goToBookings,
          goToFloor: this.goToFloor,
          goToProduct: this.goToProduct,
          getBooking: this.getBooking,
          showForm: this.showForm,
          showPopup: this.showPopup,
          closePopup: this.closePopup,
          createNew: this.createNew,
          sendEmail,
          save: this.save,
          getIntegration: this.getIntegration
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}