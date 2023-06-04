import React from "react";
import { Link } from "react-router-dom";
import { FaBriefcase, FaCarAlt } from "react-icons/fa";
import { MdColorLens } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import "../styles/listingitem.css";
const ListingItem = ({ listing, id, onDelete, onEdit }) => {
  return (
    <>
      <div className="card-item-parent d-flex align-items-center justify-content-center">
        <div className="item-card category-link mb-2 w-75  ">
          <Link to={`/category/${listing.type}/${id}`}>
            <div className="row  p-2">
              <div className="col-md-5 item-card-continer1">
                <img src={listing.imgUrls[0]} alt={listing.name} />
              </div>
              <div className="col-md-5 item-card-continer2">
                <h2>{listing.name}</h2>
                <p>{listing.address}</p>
                <p>
                  <GiTakeMyMoney /> ₹{" "}
                  {listing.offer
                    ? listing.discountedPrice
                    : listing.regularPrice}{" "}
                  {listing.type === "rent" && " / Day"}
                </p>
                {listing.type === "rent" ? (
                  <p>
                    <FaBriefcase size={20} /> &nbsp; Security Deposit- Rs.
                    {listing.security}
                  </p>
                ) : (
                  <p>
                    <FaCarAlt size={20} /> &nbsp; Model-
                    {listing.model}
                  </p>
                )}

                <p>
                  <MdColorLens size={20} /> &nbsp; Color- {listing.color}
                </p>
              </div>
            </div>
          </Link>
          <div className="m-2 p-3">
            {onDelete && (
              <button
                className="btn btn-danger"
                onClick={() => onDelete(listing.id)}
              >
                Delete Listing
              </button>
            )}
            {onEdit && (
              <button
                className="btn btn-info ms-3"
                onClick={() => onEdit(listing.id)}
              >
                Edit Listing
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingItem;
