import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
// import moduleName from 'reac'

class DialogUtils {
  #container=null;
  constructor(){
    var rootModel = document.getElementById('root-model')
    if(!rootModel){
      const newEle = document.createElement('div')
      newEle.setAttribute("id","root-model")
      document.body.appendChild(newEle)
      rootModel = newEle
    }
    this.#container=rootModel
  }
  /**
   * @param {Object} options - options to fire dialog
   * @param {string=} options.title
   * @param {string=} options.message
   * @param {function=} options.onClickYes
   * @param {string=} options.yesText
   * @param {string=} options.noText
   * @param {function=} options.onClickNo
   * @param {object} options.yesButtonProps
   * @param {object} options.noButtonProps
   * @param {object} options.dialogProps
   * @param {object} options.titleProps
   * @param {boolean=} options.disableBackdropClick
   * @param {boolean=} options.closeOnButtonClicked
   */
  openConfirmDialog = (options)=> {
    // this.#container = document.getElementById("root-model");
    const finalOptions = {
      title: "Dialog Title",
      message:
        " To subscribe to this website, please enter your email address here. We will send updates occasionally.",
      onClickYes: () => {},
      onClickNo: () => {},
      disableBackdropClick: false,
      closeOnButtonClicked: true,
      yesText: "Yes",
      noText: "No",
      ...options,
    };

    const {
      title,
      message,
      onClickYes,
      onClickNo,
      yesText,
      noText,
      disableBackdropClick,
      closeOnButtonClicked,
      yesButtonProps,
      noButtonProps,
      dialogProps,
      titleProps,
    } = finalOptions;
    ReactDOM.render(
      <Dialog
        onClose={() => this.destroy()}
        open={true}
        disableBackdropClick={disableBackdropClick}
        disableEscapeKeyDown={disableBackdropClick}
        {...dialogProps}
      >
        <DialogTitle {...titleProps}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onClickNo();
              closeOnButtonClicked && this.destroy();
            }}
            style={{ backgroundColor: "#0f0e0b", color: "white" }}
            {...noButtonProps}
          >
            {noText}
          </Button>
          <Button
            onClick={() => {
              onClickYes();
              closeOnButtonClicked && this.destroy();
            }}
            style={{ backgroundColor: "#0f0e0b", color: "white" }}
            {...yesButtonProps}
          >
            {yesText}
          </Button>
        </DialogActions>
      </Dialog>,
      this.#container
    );
  }

  /**
   * This callback type is called `customRenderCallback` and is displayed as a global symbol.
   *
   * @callback customRenderCallback
   * @param {{closeDialog:()=>{}}} callbacks
   */

  /**
   * @param {Object} options - options to fire dialog
   * @param {string=} options.title
   * @param {object} options.dialogProps
   * @param {object} options.titleProps
   * @param {boolean=} options.disableBackdropClick
   * @param {customRenderCallback} options.customRender
   */
  openCustomDialog = (options)=> {
    // this.#container = document.getElementById("root-model");
    const finalOptions = {
      title: "Dialog Title",
      customRender: () => <div>overide with customRender argument</div>,
      disableBackdropClick: false,
      ...options,
    };

    const {
      title,
      customRender,
      disableBackdropClick,
      dialogProps,
      titleProps,
    } = finalOptions;
    ReactDOM.render(
      <Dialog
        onClose={() => this.destroy()}
        open={true}
        disableBackdropClick={disableBackdropClick}
        disableEscapeKeyDown={disableBackdropClick}
        {...dialogProps}
      >
        {title && <DialogTitle {...titleProps}>{title}</DialogTitle>}
        <DialogContent>
          {customRender({
            closeDialog: this.destroy,
          })}
        </DialogContent>
      </Dialog>,
      this.#container
    );
  }

  destroy = () => {
    ReactDOM.unmountComponentAtNode(this.#container);
  };
}

export default new DialogUtils();
