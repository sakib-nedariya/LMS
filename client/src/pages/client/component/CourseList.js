import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { userRolesContext } from "../../admin/layout/RoleContext";
import { useCart } from "../../../pages/client/layout/CartContext";
import "../../../assets/css/client/allcourse.css";

const CourseList = ({ courses, category }) => {
    const { cart, addToCart, loading, loadCart } = useCart(); // Include loading state
    const { setting } = useContext(userRolesContext);
    const navigate = useNavigate();
    const savedToken = Cookies.get("student-token");

    useEffect(() => {
        loadCart();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-60">
                <p className="text-2xl font-medium text-gray-700">Loading cart...</p>
            </div>
        );
    }

    return (
        <>
            {courses?.length === 0 && (
                <div className="flex flex-col justify-center items-center h-60">
                    <p className="text-2xl font-medium text-gray-700">No courses found</p>
                </div>
            )}
            {courses?.map((course) => {
                const truncatedTitle =
                    course.course_title.length > 40
                        ? `${course.course_title.slice(0, 40)} ...`
                        : course.course_title;
                const truncatedDesc =
                    course.short_desc.length > 100
                        ? `${course.short_desc.slice(0, 100)} ...`
                        : course.short_desc;

                const courseCategory =
                    category?.find((cat) => cat.id === course.course_cate)?.cate_title || "Unknown Category";
                const truncateCate = courseCategory.length > 15 ? `${courseCategory.slice(0, 15)} ...` : courseCategory;
                const isInCart = cart.length > 0 && cart.some((item) =>
                    savedToken ? item.course_id === course.id : item.id === course.id
                );

                return (
                    <div key={course.id} className="course-main-div cursor-pointer" onClick={() => navigate(`/view-course/${course.id}`)}>
                        <div className="allcourses-course-image">
                            {course.course_thumbnail === null ? (
                                <img src={require("../../../assets/image/default-thumbnail.png")} alt="course_image" />
                            ) : (
                                <img src={`../upload/${course.course_thumbnail}`} alt={course.title} />
                            )}
                        </div>
                        <div className="course-details flex justify-between flex-col">
                            <div>
                                <div className="course-details-header">
                                    <h3>{truncatedTitle}</h3>
                                    <span>
                                        {setting.position === "left" ? setting.symbol : ""}
                                        {course.course_price}
                                        {setting.position === "right" ? setting.symbol : ""}
                                    </span>
                                </div>
                                <p>{truncatedDesc}</p>
                                <div className="course-icon-section">
                                    {course.course_language && (
                                        <span className="capitalize">
                                            <i className="fa-solid fa-graduation-cap"></i> {course.course_language}
                                        </span>
                                    )}
                                    {course.course_level && (
                                        <span className="capitalize">
                                            <i className="fa-solid fa-signal"></i> {course.course_level}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className="course-btn mt-3">
                                    <button className="security-button">{truncateCate}</button>
                                    <button
                                        className={`add-to-cart-btn ${isInCart ? "disabled" : ""}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addToCart(course);
                                        }}
                                        disabled={isInCart}
                                    >
                                        {isInCart ? "Added to Cart" : "Add to Cart"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default CourseList;
