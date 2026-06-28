import { Star } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { reviewSummary, reviews } from "@/mock";
import { cn } from "@/lib/utils";

export interface ReviewSectionProps {
  title?: string;
  limit?: number;
  className?: string;
}

export function ReviewSection({
  title = "What our guests say",
  limit = 6,
  className,
}: ReviewSectionProps) {
  const displayedReviews = reviews.slice(0, limit);

  return (
    <section className={cn("bg-go-muted-light py-12 sm:py-16", className)}>
      <div className="container-marketing">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-heading-lg font-bold text-go-ink">{title}</h2>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-go-gold text-go-gold"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="font-semibold text-go-ink">
                {reviewSummary.averageRating}
              </span>
              <span className="text-body-sm text-go-muted">
                ({reviewSummary.totalReviews} reviews)
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayedReviews.map((review) => (
            <article
              key={review.id}
              className="rounded-lg border border-go-border bg-go-paper p-5 shadow-card"
            >
              <div className="mb-3 flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{review.author.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-go-ink">{review.author.name}</p>
                  <p className="text-caption text-go-muted">
                    {new Date(review.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                {review.verified && (
                  <Badge variant="verified" className="ml-auto">
                    Verified
                  </Badge>
                )}
              </div>
              {review.title && (
                <h3 className="mb-1 font-semibold text-go-ink">{review.title}</h3>
              )}
              <p className="text-body-sm text-go-muted line-clamp-4">
                {review.content}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
