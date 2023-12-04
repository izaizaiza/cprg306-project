/**
 * @description this is a sort feature; contains a sort dropdown that allows to sort
 * art pieces by title or artist
 */

import React from 'react';

export default function Sort({ handleSortChange }) {
    return (
        // dropdown menu
        <div className="w-1/4 mb-10 mx-auto p-5 text-center">
            <h3 className="text-lg font-semibold mb-2">Sort:</h3>
            <select
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full p-2 rounded border-gray-300 text-custom-black-pearl"
            >
                <option value="default">Select</option>
                <option value="title">Title</option>
                <option value="artist">Artist</option>
            </select>
        </div>
    );
    }

// add to filter component