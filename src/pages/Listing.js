import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";
import { useNavigate, Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import SwipeCore, { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdColorLens, MdSpeed, MdLocalOffer } from "react-icons/md";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "../styles/listing.css";
import {
  FaGasPump,
  FaBriefcase,
  FaArrowCircleRight,
  FaCarAlt,
  FaRoad,
  FaMapPin,
} from "react-icons/fa";

//config
SwipeCore.use([EffectCoverflow, Pagination]);

const Listing = () => {
  const [listing, setListing] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); //eslint-disable-line
  const params = useParams();
  const auth = getAuth(); //eslint-disable-line

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Layout title={listing.name}>
      <div className="row listing-container">
        <div className="col-md-8 listing-container-col1">
          {listing.imgUrls === undefined ? (
            <Spinner />
          ) : (
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              className="mySwipe"
            >
              {listing.imgUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <img src={listing.imgUrls[index]} alt={listing.name} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        <div className="col-md-4 listing-container-col2">
          <h3>{listing.name}</h3>
          <h6>
            Price : Rs.
            {listing.offer ? listing.discountedPrice : listing.regularPrice}
            {listing.type === "rent" && "/ Day"}
          </h6>
          <p>Bike For : {listing.type === "rent" ? "Rent" : "Sale"}</p>
          <p>
            {listing.offer && (
              <span>
                <MdLocalOffer size={20} /> &nbsp; Discount- Rs.
                {listing.regularPrice - listing.discountedPrice}
              </span>
            )}
          </p>
          <p>
            <FaGasPump size={20} /> &nbsp; Mileage- {listing.mileage} kmpl
          </p>
          <p>
            <MdColorLens size={20} /> &nbsp; Color- {listing.color}
          </p>
          <p>
            <MdSpeed size={20} /> &nbsp; Top Speed- {listing.speed}kmph
          </p>
          {listing.type === "rent" ? (
            <p>
              <FaBriefcase size={20} /> &nbsp; Security Deposit- Rs.
              {listing.security}
            </p>
          ) : (
            <>
              <p>
                <FaCarAlt size={20} /> &nbsp; Model-
                {listing.model}
              </p>
              <p>
                <FaRoad size={20} /> &nbsp; Kms Driven-
                {listing.odometer} Km
              </p>
            </>
          )}
          <p>
            <FaMapPin size={20} /> &nbsp; Location- {listing.address}
          </p>
          <Link
            className="btn btn-success"
            to={`/contact/${listing.useRef}?listingName=${listing.name}`}
          >
            Contact Owner <FaArrowCircleRight size={20} />
          </Link>
        </div>
        {listing.type === "rent" && (
          <div className="container mt-5">
            <h1>
              <u>Deposit Terms</u>
            </h1>
            <h2>Deposit Amount: Rs. {listing.security}</h2>
            <ol>
              <li>One Helmet will be given with the bike.</li>
              <li>
                Another will be available on request The security Deposit is
                refundable once we receive the bike in proper condition.
              </li>
              <li>
                {" "}
                Passport Size Photo is required for Authorization and paper
                works.
              </li>
              <li>
                You need to submit a photocopy of your driving license and
                original address proof.
              </li>
              <li>A km limit of 200km/Day exceeding 4rs/km is charged.</li>
              <li>
                Weekly km limit 1000km, Monthly km limit 2200 exceeding 4rs/km A
                late fee of 100rs/hr will be charged.
              </li>
            </ol>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Listing;
