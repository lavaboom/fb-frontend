// React modules
import React, { Component } from "react";
// app styles & assets
import "./WarehouseDetailsPage.scss";
// other sub components
import WarehouseItem from "../../components/WarehouseItem/WarehouseItem";
import Modal from "../../components/Modal/Modal";

import axios from "axios";
import WarehouseListHeader from "../../components/WarehouseListHeader/WarehouseListHeader";
import WarehouseDetails from "../../components/WarehouseDetails/WarehouseDetails";
export default class WarehouseDetailsPage extends Component {
  state = {
    warehouse: {},
    warehouseItems: {},
    isLoading: true,
    modalItem: {},
    showModal: false,
  };

  getItems = () => {
    const id = this.props.match.params.id;
    axios
      .get(`http://localhost:8080/warehouse/${id}`)
      .then((response) => {
        // console.log("got warehouse");

        const itemEntries = response.data.warehouseItems.map((item) => (

          <WarehouseItem openModal={this.openModal} key={item.id} item={item} />

        ));
        const warehouseDetails = (
          <WarehouseDetails
            warehouse={response.data.requestedWarehouse}
            items={response.data.warehouseItems}
          />
        );
        this.setState({
          warehouse: response.data.requestedWarehouse,
          warehouseItems: response.data.warehouseItems,
          itemEntries: itemEntries,
          warehouseDetails: warehouseDetails,
        });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount = () => {
    this.getItems();
  };

  openModal = (item) => {
    item.name = item.itemName;
    this.setState({modalItem: item, showModal: true});
}

  closeModal = () => {
      this.setState({modalItem: {}, showModal: false});
  }

  deleteInventory = () => {
    axios.delete(`http://localhost:8080/inventory/${this.state.modalItem.id}`)
        .then(response => {
            this.getItems();
            this.closeModal();
        })
        .catch(error => {
            console.log(error);
        })
}

  // let description = <WarehouseDetails warehouse={this.state.warehouse} />

  render() {
    if (this.isLoading) return <></>;
    return (

      <div className="warehouse-details-container">
        <Modal 
          handleClose={this.closeModal}
          show={this.state.showModal}
          modalItem={this.state.modalItem}
          deleteFunction={this.deleteInventory}/>
        {this.state.warehouseDetails}
        <WarehouseListHeader />
        <div>
          {this.state.itemEntries}
        </div>
      </div>
    );
  }
}
