declare module "gsap/SplitText" {
    export interface SplitTextVars {
        type?: string;
        charsClass?: string;
        wordsClass?: string;
        linesClass?: string;
        [key: string]: unknown;
    }

    export class SplitText {
        constructor(
            target: string | Element | Array<string | Element>,
            vars?: SplitTextVars
        );

        chars: Element[];
        words: Element[];
        lines: Element[];

        revert(): void;
    }
}