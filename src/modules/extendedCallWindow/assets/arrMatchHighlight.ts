import { $m } from 'typings/Module';
export default (LSSM: Vue, allWords: boolean): void => {
    const title = document.querySelector<HTMLHeadingElement>('#missionH1');
    if (!title) return;

    const greyClass = LSSM.$stores.root.nodeAttribute('arr-grey');

    LSSM.$stores.root.addStyle({
        selectorText: `.${greyClass}`,
        style: {
            filter: 'grayscale(0.75) !important',
            position: 'relative',
        },
    });

    let wordsPreParsing: string =
        title.textContent ?? (title.textContent || '');
    const removeForParsing: string[] = $m(
        `arrHighlight.removeForParsing`,
        null
    );
    removeForParsing.forEach(stringToRemove => {
        wordsPreParsing = wordsPreParsing.replace(stringToRemove, '');
    });
    const words = (
        wordsPreParsing
            ?.trim()
            .split(' ')
            .map(w => LSSM.$utils.escapeRegex(w.toLowerCase())) || []
    ).filter(w => w.length > 3);
    Array.from(document.querySelectorAll<HTMLAnchorElement>('.aao')).forEach(
        arr => {
            const arrText = arr.textContent?.trim().toLowerCase() || '';
            const filter = allWords ? words.every : words.some;
            if (!filter.call(words, w => arrText.match(w)))
                arr.classList.add(greyClass);
        }
    );
};
