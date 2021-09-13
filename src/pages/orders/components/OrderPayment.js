import { memo } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Button,
  InputGroupAddon,
  Input,
  InputGroup,
} from "reactstrap";
import SimpleBar from "simplebar-react"

const OrderPayment = memo(({ order, onPay, onCancel, payment, onPaymentChange, onPaymentCurrencyChange }) => {
  console.log(order)
  return (
    <Card style={{ minHeight: "60vh" }}>
      <CardBody>
        <h4 className="card-title mb-4">Payment</h4>
        <Row className="mb-4">
          <Col lg={4}>
            <div>
              <p className="text-muted mb-4">
                <i className="mdi mdi-wallet mr-1" /> Total Amount
              </p>
              <h5>
                {order.price.payoutTotal?.toLocaleString("en-US", {
                  style: "currency",
                  currency: order.price.payoutCurrency,
                })}
              </h5>
            </div>
          </Col>
          <Col lg={4}>
            <div>
              <p className="text-muted mb-4">
                <i className="mdi mdi-wallet mr-1" /> Currently Paid
              </p>
              <h5>
                {order.price.paid?.toLocaleString("en-US", {
                  style: "currency",
                  currency: order.price.payoutCurrency,
                })}
              </h5>
            </div>
          </Col>
          <Col lg={4}>
            <div>
              <p className="text-muted mb-4">
                <i className="mdi mdi-wallet mr-1" /> Remaining Amount
              </p>
              <h5>
                {(
                  order.price.payoutTotal - order.price.paid || "0"
                )?.toLocaleString("en-US", {
                  style: "currency",
                  currency: order.price.payoutCurrency,
                })}
              </h5>
            </div>
          </Col>
        </Row>

        <div>
          <Label className="mb-4">Add Payment :</Label>

          <InputGroup className="mb-4">
            <InputGroupAddon addonType="prepend">
              <Label className="input-group-text" for="amount">Payment</Label>
            </InputGroupAddon>
            <Input
              id="amount"
              name="amount"
              type="number"
              className="form-control"
              value={payment.amount}
              onChange={onPaymentChange}
            />
            <InputGroupAddon addonType="append">
              <Label className="input-group-text" for="paymentCurrency">
                Currency
              </Label>
            </InputGroupAddon>
            <select
              id="paymentCurrency"
              name="paymentCurrency"
              className="form-control"
              style={{ maxWidth: "5rem" }}
              value={payment.currency}
              onChange={onPaymentCurrencyChange}
            >
              <option value=""></option>
              <option value="AED">AED</option>
              <option value="USD">USD</option>
              <option value="SDG">SDG</option>
              <option value="SAR">SAR</option>
            </select>
          </InputGroup>
        </div>

        <Row className="mb-5">
          <Col xs={6} className="text-right">
            <Button
              type="button"
              color="success"
              className="w-md"
              onClick={onPay}
            >
              <i className="bx bx-check-double font-size-16 align-middle mr-2" />
              Add Payment
            </Button>
          </Col>
          <Col xs={6} className="text-left">
            <Button
              type="button"
              color="danger"
              className="w-md"
              onClick={onCancel}
            >
              <i className="bx bx-block font-size-16 align-middle mr-2" />
              Cancel Order
            </Button>
          </Col>
        </Row>

        <div>
          <Label className="mb-4">Previous Payments :</Label>
          {!order.payments.length && <p className="mt-4 text-center">No Previous Payments</p>}
          {order.payments.length > 0 && (
            <SimpleBar>
              <ul className="verti-timeline list-unstyled">
                {order.payments.map((payment, key) => (
                  <li key={key} className="event-list">
                    <div className="event-timeline-dot">
                      <i className="bx bx-right-arrow-circle font-size-18" />
                    </div>
                    <div className="media">
                      <div className="mr-3">
                        <h5 className="font-size-14">
                          {new Date(payment.at).toDateString()}
                          <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ml-2" />
                        </h5>
                      </div>
                      <div className="media-body">
                        <h6 className="font-size-15">{`${payment.amount} ${payment.currency}`}</h6>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </SimpleBar>
          )}
        </div>

      </CardBody>
    </Card>
  );
});

export default OrderPayment;
