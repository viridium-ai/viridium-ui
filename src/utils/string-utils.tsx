
import labels from "../common/resources/labels.json";

export class StringUtils {
    /**
     * Returns the plural of an English word.
     *
     * @export
     * @param {string} word
     * @param {number} [amount]
     * @returns {string}
     */
    public static plural(word: string, amount?: number): string{
        if (amount !== undefined && amount === 1) {
            return word
        }
        const plural: { [key: string]: string } = {
            '(quiz)$': "$1zes",
            '^(ox)$': "$1en",
            '([m|l])ouse$': "$1ice",
            '(matr|vert|ind)ix|ex$': "$1ices",
            '(x|ch|ss|sh)$': "$1es",
            '([^aeiouy]|qu)y$': "$1ies",
            '(hive)$': "$1s",
            '(?:([^f])fe|([lr])f)$': "$1$2ves",
            '(shea|lea|loa|thie)f$': "$1ves",
            'sis$': "ses",
            '([ti])um$': "$1a",
            '(tomat|potat|ech|her|vet)o$': "$1oes",
            '(bu)s$': "$1ses",
            '(alias)$': "$1es",
            '(octop)us$': "$1i",
            '(ax|test)is$': "$1es",
            '(us)$': "$1es",
            '([^s]+)$': "$1s"
        }
        const irregular: { [key: string]: string } = {
            'move': 'moves',
            'foot': 'feet',
            'goose': 'geese',
            'sex': 'sexes',
            'child': 'children',
            'man': 'men',
            'tooth': 'teeth',
            'person': 'people'
        }
        const uncountable: string[] = [
            'sheep',
            'inventory',
            'fish',
            'deer',
            'moose',
            'series',
            'species',
            'money',
            'rice',
            'information',
            'equipment',
            'bison',
            'cod',
            'offspring',
            'pike',
            'salmon',
            'shrimp',
            'swine',
            'trout',
            'aircraft',
            'hovercraft',
            'spacecraft',
            'sugar',
            'tuna',
            'you',
            'wood'
        ]
        // save some time in the case that singular and plural are the same
        if (uncountable.indexOf(word.toLowerCase()) >= 0) {
            return word
        }
        // check for irregular forms
        for (const w in irregular) {
            const pattern = new RegExp(`${w}$`, 'i')
            const replace = irregular[w]
            if (pattern.test(word)) {
                return word.replace(pattern, replace)
            }
        }
        // check for matches using regular expressions
        for (const reg in plural) {
            const pattern = new RegExp(reg, 'i')
            if (pattern.test(word)) {
                return word.replace(pattern, plural[reg])
            }
        }
        return word
    }
    
    public static t(name: string | undefined): string | undefined {
        if (!name) {
            return undefined;
        }

        let label = labels.find((l: any) => l.name === name);

        return label ? label.label : StringUtils.toLabel(name);
    }

    public static toLabel = (name: string | undefined): string | undefined => {
        if (!name) {
            return undefined;
        }
        const result = name.replace(/([A-Z])/g, " $1");
        const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

        return finalResult;
    }
}