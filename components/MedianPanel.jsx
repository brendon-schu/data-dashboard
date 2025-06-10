export default function MedianPanel({ data, medianCols }) {
    if (!data || !data.length || medianCols.length !== 1) {
        return <div className="text-sm text-gray-500 p-2">Select one column to get median.</div>;
    }

    const key = medianCols[0];

    const values = data
        .map(row => parseFloat(row[key]))
        .filter(val => !isNaN(val));

    const median = (() => {
        const nums = data
            .map(row => parseFloat(row[key]))
            .filter(val => !isNaN(val))
            .sort((a, b) => a - b);

        const len = nums.length;
        if (len === 0) return 0;

        const mid = Math.floor(len / 2);
        return len % 2 === 0
            ? (nums[mid - 1] + nums[mid]) / 2
            : nums[mid];
    })();

    return (
        <div className="p-2 text-sm text-gray-700">
            <strong>Median {key}:</strong> {median}
        </div>
    );
}

