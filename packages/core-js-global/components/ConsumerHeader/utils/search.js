import {chain} from 'lodash';
import * as constants from '../constants';
import {formatUrl} from 'url-lib';

const _getFallbackSuggestions = () => (
    Promise.resolve(constants.FALLBACK_SUGGESTIONS)
);

const _parseSuggestionsFromResponse = (response) => {
    let suggestions = [];

    if (response.version) {
        // The `response` is grouped into groups like `top_match`, `events`, etc.,
        // each with their own sets of results. `SUGGESTIONS_RESPONSE_GROUPS`
        // contains the order in which we want to process those results, so we
        // gather that list into an lodash object.
        suggestions = chain(constants.SUGGESTIONS_RESPONSE_GROUPS)
            // Then we map over that ordering an return the list of results for
            // each group. This will result in an array of arrays; an array of
            // group results lists.
            .map((group) => response[group] || [])

            // Next flatten that array of array into a single-level array of
            // results. We've now lost the grouping information, but for now,
            // we don't care.
            .flattenDeep()
            
            // Just in case we got bad data from the API, filter down to just the
            // results where we actually have both a URL and a title
            .filter(({url, name}) => url && name)

            // Now that we have a flatten list, convert the API response data
            // for each result into the format that the search suggestions would
            // like. The results `url` will be the `value`, and the results `name`
            // will be the `content`
            .map(({url, name}) => ({value: url, content: name}))

            // lastly get the actual value out of the lodash object
            .value();
    }

    return suggestions;
};

const _fetchSuggestions = (query, location) => (
    fetch(
        formatUrl(constants.SUGGESTIONS_API_URL, {
            q: query,
            loc: location,
        }),
        {
            method: 'GET',
        }
    )
        .then((resp) => resp.json())
        .then(_parseSuggestionsFromResponse)
);

export const getSuggestions = (query, location = constants.DEFAULT_LOCATION) => (
    // less than 2 is because SOLR won't match on 1 letter
    !query || query.length < 2
        ? _getFallbackSuggestions()
        : _fetchSuggestions(query, location)
);
