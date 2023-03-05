import React, { useState, useEffect } from "react";
import Hero from "@/pages/course/courseHero";
import Sidebar from "@/pages/course/courseSidebar";
import CourseCards from "@/pages/course/courseCards";
import { Course } from "@/services/course-service";
import CourseService from "@/services/course-service";
import Navbar from "../../components/navbar";
import SearchBar from "@/components/adminCourse/search";
import { Grid } from "@mui/material";
import { Pagination } from "@mui/material";


export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const [count, setCount] = useState(1);
  const [length, setLength] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    CourseService.getAll({
      page: page,
      limit: perPage,
      title: search,
    })
      .then((response) => {
        setCourses(response.data.data);
        setLength(response.data.meta.totalPage * perPage);
        setCount(response.data.meta.totalPage);
      })
      .catch((error) => console.log(error));
  }, [page, perPage]);

  const [difficulty, setDifficulty] = useState("All Difficulty");
  const [selected, setSelected] = useState<number[] | undefined>(undefined);
  const difficultyList = ["beginner", "intermediate", "advanced"]
  const searchQuery = (search: string) => {
    CourseService.getAll({
      page: page,
      limit: perPage,
      title: search,
      difficulty: difficultyList.includes(difficulty.toLowerCase()) ? difficulty.toLowerCase() : undefined,
      categoryId: selected,
    })
      .then((response) => {
        setCourses(response.data.data);
        setPage(1)
        setLength(response.data.meta.totalPage * perPage);
        setCount(response.data.meta.totalPage);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchQuery(search);
    }, 500);

    return () => clearTimeout(delayDebounceFn); 
  }, [search, difficulty, selected]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto justify-center custom-Poppins ">
        <Hero
          title="Courses"
          breadcrumbs={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Courses",
              href: "/course/list",
            },
          ]}
        />
      </div>
      <div className="container mx-auto flex flex-wrap justify-center custom-Poppins ">
        <div className="w-full md:w-1/5 px-4">
          <Sidebar difficulty={difficulty} setDifficulty={setDifficulty} selected={selected} setSelected={setSelected} />
        </div>
        <div className="w-full md:w-4/5 px-4">
          <div className="flex justify-center">
            <SearchBar searchTerm={search} setSearchTerm={setSearch} />
          </div>
          <CourseCards courses={courses} />
          <Grid container direction="row" justifyContent="center" marginTop={2}>
            <Pagination
              count={count}
              size="large"
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
          </Grid>
        </div>
      </div>
    </>
  );
}
