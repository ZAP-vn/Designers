import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ThemeState } from '../../types';

// --- Types ---
interface PaginationProps {
    currentPage: number;
    totalCount: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    themeState: ThemeState;
    siblingCount?: number;
    showSummary?: boolean; // "Showing 1 to 10 of 50 results"
}

// --- Hook ---
const usePaginationRange = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage,
}: {
    totalCount: number;
    pageSize: number;
    siblingCount?: number;
    currentPage: number;
}) => {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);
        const totalPageNumbers = siblingCount + 5;

        // Case 1: If the number of pages is less than the page numbers we want to show in our
        // paginationComponent, we return the range [1..totalPageCount]
        if (totalPageNumbers >= totalPageCount) {
            return Array.from({ length: totalPageCount }, (_, i) => i + 1);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;
        const DOTS = '...';

        const range = (start: number, end: number) => {
            let length = end - start + 1;
            return Array.from({ length }, (_, idx) => idx + start);
        };

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);
            return [...leftRange, DOTS, totalPageCount];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
            return [firstPageIndex, DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange;
};

// --- Component ---
export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalCount,
    pageSize,
    onPageChange,
    themeState,
    siblingCount = 1,
    showSummary = true,
}) => {
    const paginationRange = usePaginationRange({
        currentPage,
        totalCount,
        pageSize,
        siblingCount,
    });

    const totalPages = Math.ceil(totalCount / pageSize);

    // If there is only 1 page, we technically don't need to render pagination, 
    // but typically we still do if showSummary is true for context, 
    // or we might want to hide it. For ZAP, let's hide if totalCount is 0, 
    // but show if we have at least items.
    if (currentPage === 0 || paginationRange && paginationRange.length < 2) {
        // Optionally you can return null here if you want to hide single pages
    }

    // Ensure we don't divide by zero or negative
    if (totalCount <= 0) return null;

    const onNext = () => onPageChange(Math.min(currentPage + 1, totalPages));
    const onPrevious = () => onPageChange(Math.max(currentPage - 1, 1));

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 text-sm text-gray-600 px-2 font-medium gap-4 sm:gap-0">
            {showSummary && (
                <span className="text-center sm:text-left">
                    Showing <span className="font-bold text-gray-800">{Math.min((currentPage - 1) * pageSize + 1, totalCount)}</span> to <span className="font-bold text-gray-800">{Math.min(currentPage * pageSize, totalCount)}</span> of <span className="font-bold text-gray-800">{totalCount}</span> results
                </span>
            )}
            <div className="flex items-center gap-1">
                <button
                    onClick={onPrevious}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-400 hover:text-gray-700 disabled:text-gray-200 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous Page"
                >
                    <ChevronLeft size={16} />
                </button>
                <div className="flex items-center gap-1">
                    {paginationRange?.map((pageNumber, index) => {
                        if (pageNumber === '...') {
                            return <span key={`dots-${index}`} className="w-8 h-8 flex items-center justify-center text-xs text-gray-400">...</span>;
                        }
                        const isActive = currentPage === pageNumber;
                        return (
                            <button
                                key={pageNumber}
                                onClick={() => onPageChange(pageNumber as number)}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${!isActive && 'hover:bg-gray-100'}`}
                                style={{
                                    backgroundColor: isActive ? themeState.primary : 'transparent',
                                    color: isActive ? themeState.primaryBtnText : themeState.darkText,
                                }}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}
                </div>
                <button
                    onClick={onNext}
                    disabled={currentPage === totalPages}
                    className="p-2 text-gray-400 hover:text-gray-700 disabled:text-gray-200 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next Page"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};
