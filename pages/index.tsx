import React, { useState } from "react";
import { Button, Htag, Input, Paragraph, Rating, Tag } from "../components";
import { Textarea } from "../components/Textarea/Textarea";
import { withLayout } from "../layout/Layout";

function Home(): JSX.Element {
  const [counter, setCounter] = useState<number>(0);
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Htag tag="h1">sdfsdf</Htag>
      <Button
        appearance="primary"
        arrow="right"
        onClick={() => setCounter(counter + 1)}
      >
        Кнопка
      </Button>
      <Button appearance="ghost" arrow="down">
        Кнопка
      </Button>
      <Paragraph size="l">Больf</Paragraph>
      <Paragraph>Средний</Paragraph>
      <Paragraph size="s">Малsdенs</Paragraph>
      <Tag color="green" size="m">
        200
      </Tag>
      <Tag color="red" size="s">
        100
      </Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
      <Input placeholder="Текст" />
      <Textarea />
    </>
  );
}

export default withLayout(Home);
