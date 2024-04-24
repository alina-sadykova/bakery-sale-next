import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { itemCategories, itemCategorisFilter } from "@/models/item";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [category, setCategory] = useState(
    searchParams.get("category") || "all" //a way to add additional information in url after ? that has a key value (?title=hello&filter=suv)
  );
  const router = useRouter();

  function handleClick(value: string) {
    const search = new URLSearchParams(searchParams); // an object to work with searchParams, it turns given value into object and has its own methods like delete, set, toString.
    if (value === "all") {
      search.delete("category");
    } else {
      search.set("category", value);
    }
    router.push(`${pathName}?${search.toString()}`);
    setCategory(value);
  }

  return (
    <ButtonGroup aria-label="Basic button group">
      {itemCategorisFilter.map((item) => {
        return (
          <Button
            onClick={() => handleClick(item)}
            variant={item === category ? "contained" : "outlined"}
          >
            {item}
          </Button>
        );
      })}
    </ButtonGroup>
  );
}
