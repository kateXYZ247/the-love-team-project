import React from "react";
import ProductsComponent from "../../../components/Products/Products";
import { orderProductsPageButtonText } from "../../../constant/order";
import BottomAction from "../../../components/Order/BottomAction/BottomAction";

function Products(props) {
  const { orderServicesCount, onAppointmentModalOpen, onUpdateCart } = props;

  const nextButtonClickedHandler = () => {
    onUpdateCart();
  };

  return (
    <React.Fragment>
      <ProductsComponent />
      <BottomAction
        buttonText={orderProductsPageButtonText}
        numServices={orderServicesCount}
        onEditCart={onAppointmentModalOpen}
        onClickNext={nextButtonClickedHandler}
      />
    </React.Fragment>
  );
}

export default Products;
