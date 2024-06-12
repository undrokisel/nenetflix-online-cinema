import { starWarsFont_1 } from "assets";
import p5 from "p5";
import { FC, useLayoutEffect, useRef } from "react";

interface Props {
  titleText: string;
  summaryText: string;
}

export const StarWarsSketch: FC<Props> = (props: Props) => {
  const sketchRef = useRef<p5>();

  useLayoutEffect(() => {
    const Sketch = (p: p5) => {
      let textFont: p5.Font;
      let titleFont: p5.Font;
      let textX: number;
      let textY: number;
      let titleSize: number;
      let textAlpha: number;

      p.preload = () => {
        textFont = p.loadFont(starWarsFont_1);
        titleFont = p.loadFont(starWarsFont_1);
      };

      p.setup = () => {
        const overlayElement = document.getElementById("canvas");
        if (overlayElement) {
          const overlayWidth = overlayElement.offsetWidth;
          const overlayHeight = overlayElement.offsetHeight;
          const canva = p.createCanvas(overlayWidth, overlayHeight, p.WEBGL);
          p.background(0);
          canva.parent("canvas");
          textX = -p.width / 2 + p.width * 0.15;
          textY = p.height / 2;
          titleSize = p.width / 3;
          textAlpha = 255;
        }
      };

      p.draw = () => {
        p.background(0);
        p.textFont(titleFont);
        p.fill(255, 232, 31);
        p.textSize(titleSize);
        p.textAlign(p.CENTER);
        p.textLeading(titleSize);
        p.text(props.titleText, 0, 0);

        if (titleSize < p.width / 10) {
          p.fill(255, 232, 31, textAlpha);
          p.textFont(textFont);
          p.textSize(p.width / 30);
          p.textAlign(p.CENTER);
          p.rotateX(p.PI / 10);
          p.textLeading(p.width / 15);
          p.text(props.summaryText, textX, textY, p.width * 0.7, p.height * 10);
          textY -= 0.5;
          if (textY < -p.width / 1.7) {
            titleSize = p.width / 3;
            textX = -p.width / 2 + p.width * 0.15;
            textY = p.height / 2;
            textAlpha = 255;
          }
        }

        if (titleSize > 0) {
          titleSize--;
        }
      };
      p.loop();
    };

    sketchRef.current = new p5(Sketch);

    return () => {
      sketchRef.current?.remove();
    };
  }, []);

  return (
    <div
      id="canvas"
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    ></div>
  );
};
