import Image from "next/image";
import { Course } from "@/services/course-service";
import { Chip } from "@mui/material";
import { Card, CardContent, CardActions, Typography } from "@mui/material";
import {Button} from "@mui/material";
import userService from "@/services/user-service";



interface SubcribedCardProps {
  course: Course;
}

const SubcribedCard: React.FC<SubcribedCardProps> = ({ course }) => {
  const APINEMBAK = "/api/file";
  const imageLoader = ({ src }: { src: string }): string => {
    return `${src}`;
  };

  return (
    // <Link href="/course/[id]/description" as={`/course/${course.id}/description`}>
      <Card
        sx={{
          maxWidth: 360,
          borderRadius: "0.5rem",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          border: "1px solid #D1D5DB",
          borderColor: "gray.400",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.2)",
          },
          "&:active": {
            transform: "translateY(0)",
            boxShadow: "0px 2px 4px rgba(38, 38, 38, 0.2)",
          },
        }}
      >
        <div
          style={{
            position: "relative",
            paddingTop: "56.25%",
          }}
        >
          <Image
            fill
            src={
              course.__thumbnail__
                ? `${APINEMBAK}/${course.__thumbnail__.id}`
                : "https://source.unsplash.com/random"
            }
            alt="course thumbnail"
            loader={imageLoader}
            className="absolute top-0 left-0 w-full h-full object-contain rounded object-center py-3 px-3 bg-zinc-100"
          />
        </div>
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              mb: "1rem",
              maxHeight: 64,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {course.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              maxHeight: 48,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {course.description}
          </Typography>
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: "1rem" }}>
            <Chip
              label={course.difficulty}
              sx={{
                backgroundColor:
                  course.difficulty === "beginner"
                    ? "#E8F5E9"
                    : course.difficulty === "intermediate"
                    ? "#FFFDE7"
                    : "#FFEBEE",
                color:
                  course.difficulty === "beginner"
                    ? "#2E7D32"
                    : course.difficulty === "intermediate"
                    ? "#FFB900"
                    : "#C62828",
                marginRight: "0.5rem",
                marginBottom: "1rem",
              }}
            />
          </div>
          <CardActions className="flex items-center justify-center">
            <Button
              size="small"
              variant="contained"
              className="w-64 bg-blackbutton text-white"
              href={`/course/${course.id}/description`}
            >
              Learn Now!
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    // </Link>
  );
};

export default SubcribedCard;
