import React from "react";
import { BiUser } from "react-icons/bi";
import { Button } from "antd";

const MainComp = () => {
	return (
		<div className="container">
			<div className="text-center main-comp-wrapper main-contex">
				<h3>We help save your money</h3>
				<div className="images_wrap">
					<div className="row">
						<div className="col-md-4">
							<img className="w-100 img-ht-100" src={require("../../assets/images/phone.jpg")} alt="" />
						</div>
						<div className="col-md-4">
							<img className="img-ht-50" src={require("../../assets/images/phone.jpg")} alt="" />
							<img
								className="img-ht-50"
								style={{ marginTop: "30px" }}
								src={require("../../assets/images/phone.jpg")}
								alt=""
							/>
						</div>
						<div className="col-md-4">
							<div className="my-card text-center d-flex align-items-center flex-column bd-highlight">
								<BiUser className="user-icon bd-highlight" />
								<p className="bd-highlight m-auto">
									To receive notifications on price drops for all product categories, you must register
								</p>
								<Button className="w-100 bd-highlight">Register</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default MainComp;
