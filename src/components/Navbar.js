import React from 'react';
import {
	FaAngleRight,
	FaAngleLeft, 
	FaChartBar, 
	FaThLarge, 
	FaShoppingCart, 
	FaCog,
	FaSignOutAlt,
	FaBars,
	FaBoxes,
	FaReceipt,
	FaRegClipboard,
	FaRegUserCircle
} from 'react-icons/fa';
import { NavLink, Outlet, useParams } from "react-router-dom";
import "../styles/navbar.css";

const ICON_SIZE = 20;

function Navbar({visible, show}) {

	return (
		<>
			<div className="mobile-nav">
				<button
					className="mobile-nav-btn"
					onClick={() => show(!visible)}
				>
					<FaBars size={24}  />
				</button>
			</div>
			<nav className={!visible ? 'navbar' : ''}>
				<button
					type="button"
					className="nav-btn"
					onClick={() => show(!visible)}
				>
					{ !visible
						? <FaAngleRight size={30} /> : <FaAngleLeft size={30} />}
				</button>
				<div>
					<NavLink
						className="logo"
						to="/admin"
					>
							<img
								src={""}
								alt="logo"
							/>
					</NavLink>
					<div className="links nav-top">
					<NavLink to="/admin/editAdmin" className="nav-link">
							<FaThLarge size={ICON_SIZE} />
							<span>Edit Admin</span>
						</NavLink>
						<NavLink to="/admin/orders" className="nav-link">
							<FaShoppingCart size={ICON_SIZE} />
							<span>Orders</span> 
						</NavLink>
                        <NavLink to="/admin/supplies" className="nav-link">
						<FaBoxes size={ICON_SIZE} />
							<span>Supplies</span>
						</NavLink>
                        <NavLink to="/admin/transactions" className="nav-link">
							<FaReceipt size={ICON_SIZE} />
							<span>Transactions</span>
						</NavLink>
                        <NavLink to="/admin/pethistory" className="nav-link">
							<FaRegClipboard size={ICON_SIZE} />
							<span>Record pet history</span>
						</NavLink>
                        <NavLink to="/admin/addnewemployee" className="nav-link">
							<FaRegUserCircle size={ICON_SIZE} />
							<span>Add new employee</span>
						</NavLink>
						<NavLink to="/admin/fbcomment" className="nav-link">
							<FaChartBar size={ICON_SIZE} />
							<span>Feedback </span>
						</NavLink>
						
					</div>
				</div>

				<div className="links">
					<NavLink to="/Sign-out" className="nav-link">
						<FaSignOutAlt size={ICON_SIZE} />
						<span>Logout</span> 
					</NavLink>
				</div>
			</nav>
			<Outlet />
		</>
  );
}

export default Navbar;