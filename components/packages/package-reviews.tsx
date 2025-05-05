"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock data for package reviews
const reviewsData = {
  averageRating: 4.7,
  totalReviews: 128,
  ratingDistribution: [
    { stars: 5, percentage: 80, count: 102 },
    { stars: 4, percentage: 15, count: 19 },
    { stars: 3, percentage: 3, count: 4 },
    { stars: 2, percentage: 1, count: 2 },
    { stars: 1, percentage: 1, count: 1 },
  ],
  reviews: [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "June 15, 2023",
      rating: 5,
      title: "Unforgettable Bali Experience",
      comment:
        "This tour exceeded all my expectations! The itinerary was perfectly balanced between cultural experiences, nature, and relaxation. Our guide was knowledgeable and friendly, making the whole experience even better. The accommodations were excellent and the food was amazing. I particularly loved the Monkey Forest and the rice terraces. Highly recommend!",
      helpful: 24,
      images: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "May 28, 2023",
      rating: 5,
      title: "Best Family Vacation Ever",
      comment:
        "We took this tour as a family of four and everyone loved it! The dolphin watching was a highlight for the kids, and my wife and I enjoyed the cultural aspects. The hotels were comfortable and well-located. Our guide was patient with our children and very informative. Would definitely book with this company again!",
      helpful: 18,
      images: [],
    },
    {
      id: 3,
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "April 10, 2023",
      rating: 4,
      title: "Great Tour with Minor Issues",
      comment:
        "Overall, this was a wonderful experience. The itinerary was well-planned and covered all the major attractions. The only reason I'm giving 4 stars instead of 5 is because one of our hotels had some maintenance issues. However, the tour company was quick to address the problem. The sunset at Tanah Lot was absolutely breathtaking!",
      helpful: 12,
      images: ["/placeholder.svg?height=100&width=100"],
    },
  ],
}

export function PackageReviews() {
  const [likedReviews, setLikedReviews] = useState<number[]>([])

  const handleLikeReview = (reviewId: number) => {
    if (likedReviews.includes(reviewId)) {
      setLikedReviews(likedReviews.filter((id) => id !== reviewId))
    } else {
      setLikedReviews([...likedReviews, reviewId])
    }
  }

  return (
    <Card className="border-border">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6">Guest Reviews</h2>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col items-center justify-center">
            <div className="text-4xl font-bold">{reviewsData.averageRating}</div>
            <div className="flex items-center my-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(reviewsData.averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : i < reviewsData.averageRating
                        ? "fill-yellow-400/50 text-yellow-400"
                        : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">Based on {reviewsData.totalReviews} reviews</div>
          </div>

          <div className="col-span-2">
            <div className="space-y-2">
              {reviewsData.ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-2">
                  <div className="w-12 text-sm">{item.stars} stars</div>
                  <Progress value={item.percentage} className="h-2" />
                  <div className="w-12 text-sm text-right">{item.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {reviewsData.reviews.map((review) => (
            <div key={review.id} className="border-b border-border pb-6 last:border-0">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{review.name}</div>
                    <div className="text-sm text-muted-foreground">{review.date}</div>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h4 className="font-semibold mb-2">{review.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{review.comment}</p>

              {review.images.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {review.images.map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`Review image ${index + 1}`}
                      className="h-20 w-20 object-cover rounded-md"
                    />
                  ))}
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                className={`text-xs flex items-center gap-1 ${
                  likedReviews.includes(review.id) ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => handleLikeReview(review.id)}
              >
                <ThumbsUp className="h-3 w-3" />
                Helpful ({likedReviews.includes(review.id) ? review.helpful + 1 : review.helpful})
              </Button>
            </div>
          ))}
        </div>

        <Button className="mt-6">View All Reviews</Button>
      </CardContent>
    </Card>
  )
}
