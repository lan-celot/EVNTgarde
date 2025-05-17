<<<<<<< Updated upstream
import React, { useState } from "react";
import ReviewCard from "./ReviewCard";

const sampleReviewsReceived = [
  {
    reviewTitle: "Fantastic Organizer",
    stars: 5,
    eventReview: "The event went flawlessly thanks to this amazing organizer!",
    dateReviewed: "Feb 20, 2025",
    reviewer: "Juan Dela Cruz",
    eventTags: ["Concert", "School Event"],
    images: [],
    direction: "by" as const,
  },
  {
    reviewTitle: "Excellent Planning",
    stars: 5,
    eventReview: "Great planning and coordination. Very satisfied!",
    dateReviewed: "Feb 20, 2025",
    reviewer: "Maria Santos",
    eventTags: ["Catering"],
    images: [],
    direction: "by" as const,
  },
  {
    reviewTitle: "Highly Professional",
    stars: 5,
    eventReview: "Their professionalism was outstanding.",
    dateReviewed: "Feb 15, 2025",
    reviewer: "Elena Rodriguez",
    eventTags: ["Photography"],
    images: [],
    direction: "by" as const,
  },
  {
    reviewTitle: "Energetic Performance",
    stars: 4,
    eventReview: "The performance was full of energy!",
    dateReviewed: "Feb 10, 2025",
    reviewer: "Ricardo Gomez",
    eventTags: ["DJ"],
    images: [],
    direction: "by" as const,
  },
  {
    reviewTitle: "Stunning Location",
    stars: 5,
    eventReview: "The location made the event truly special.",
    dateReviewed: "Feb 05, 2025",
    reviewer: "Sofia Lopez",
    eventTags: ["Venue"],
    images: [],
    direction: "by" as const,
  },
  {
    reviewTitle: "Great Communication",
    stars: 5,
    eventReview: "Communication was clear and prompt.",
    dateReviewed: "Jan 30, 2025",
    reviewer: "Carlos Perez",
    eventTags: ["Service"],
    images: [],
    direction: "by" as const,
  },
  {
    reviewTitle: "Satisfactory Result",
    stars: 4,
    eventReview: "The result was satisfactory.",
    dateReviewed: "Jan 25, 2025",
    reviewer: "Isabela Vargas",
    eventTags: ["Other"],
    images: [],
    direction: "by" as const,
  },
  {
    reviewTitle: "Would Hire Again",
    stars: 5,
    eventReview: "I would definitely hire them again.",
    dateReviewed: "Jan 20, 2025",
    reviewer: "Javier Torres",
    eventTags: ["Recommendation"],
    images: [],
    direction: "by" as const,
  },
  {
    reviewTitle: "Reasonable Pricing",
    stars: 4,
    eventReview: "The pricing was very reasonable.",
    dateReviewed: "Jan 15, 2025",
    reviewer: "Luisa Fernandez",
    eventTags: ["Value"],
    images: [],
    direction: "by" as const,
  },
  {
    reviewTitle: "Decent Job",
    stars: 3,
    eventReview: "They did a decent job.",
    dateReviewed: "Jan 10, 2025",
    reviewer: "Andres Diaz",
    eventTags: ["Performance"],
    images: [],
    direction: "by" as const,
  },
  {
    reviewTitle: "Impressed with Detail",
    stars: 5,
    eventReview: "I was very impressed with their attention to detail.",
    dateReviewed: "Jan 05, 2025",
    reviewer: "Manuela Flores",
    eventTags: ["Organization"],
    images: [],
    direction: "by" as const,
  },
  {
    reviewTitle: "Smooth Process",
    stars: 5,
    eventReview: "The entire process was very smooth.",
    dateReviewed: "Dec 30, 2024",
    reviewer: "Pablo Ruiz",
    eventTags: ["Planning"],
    images: [],
    direction: "by" as const,
  },
];

=======
import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import ReviewCard from "./ReviewCard";

>>>>>>> Stashed changes
const itemsPerPage = 5;

interface Props {
  onBack: () => void;
}

<<<<<<< Updated upstream
const ReviewsReceived: React.FC<Props> = ({ onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = sampleReviewsReceived.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sampleReviewsReceived.length / itemsPerPage);
=======
interface CSVRow {
  review_title: string;
  liking_score: string; // CSVs are strings
  text_review: string;
  review_date: string;
  reviewed_by: string;
  event_type?: string;
  images?: string; // comma-separated or ignore for now
}

interface Review {
  reviewTitle: string;
  stars: number;
  eventReview: string;
  dateReviewed: string;
  reviewer: string;
  eventTags: string[];
  images: string[]; // you can load later
  direction: "by";
}

const ReviewsReceived: React.FC<Props> = ({ onBack }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("/Reviews.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse<CSVRow>(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const mapped = result.data.map((r) => ({
              reviewTitle: r.review_title || "No Title", // Provide fallback if title is missing
              stars: r.liking_score
                ? Math.round((parseFloat(r.liking_score) * 10) / 2)
                : 0, // Handle missing liking_score
              eventReview: r.text_review || "No Review", // Provide fallback for review text
              dateReviewed: r.review_date || "Unknown Date", // Handle missing date
              reviewer: r.reviewed_by || "Anonymous", // Provide fallback for reviewer
              eventTags: r.event_type ? [r.event_type] : [], // Map event_type to eventTags (or adjust as needed)
              images: r.images
                ? r.images.split(",").map((image) => image.trim())
                : [], // Handle images (comma-separated, trim any extra spaces)
              direction: "by" as const,
            }));
            setReviews(mapped.reverse()); // Set reviews after mapping
            //console.log(mapped); // Log mapped reviews
          },
        });
      });
  }, []);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = reviews.slice(startIndex, endIndex);
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
>>>>>>> Stashed changes

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="text-blue-600 font-medium hover:underline"
        >
          &larr; Back
        </button>
      </div>
      <h2 className="text-xl font-bold mb-4">Reviews Received</h2>
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
      <div className="space-y-4 mb-8">
        {currentReviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-3 py-1 rounded-md text-sm ${
                  currentPage === pageNumber
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewsReceived;
