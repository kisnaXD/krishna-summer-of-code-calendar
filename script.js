const startDate = new Date('2025-05-24');
const currentDate = new Date();
const days = 50;
const daysPerPage = 7;
const totalPages = Math.ceil(days / daysPerPage);
const calendar = document.querySelector('.calendar');
const prevPage = document.getElementById('prev-page');
const nextPage = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');
let progressData = JSON.parse(localStorage.getItem('progressData')) || {};
let currentPage = 1;
const predefinedNotes = {
    '2025-05-24': "Revision of arrays started \n\n- Merge Sort ✅ \n- Quick Sort ✅ \n- Second Largest Element ✅ \n- Remove duplicates from sorted array ✅",
    '2025-05-25': "Revision of arrays continues \n\n- Rorate Array K Times ✅ \n- Union/Intersection ✅ \n- Moore's Voting Algorithm ✅ \n- Best Time to Buy and Sell Stocks ✅",
    '2025-05-26': "Revision of arrays continues \n\n- Started Leetcoding my progress ✅ \n -Two Sum Problem ✅ \n- Largest Subarray with a Given Sum ✅ \n- Missing Number ✅",
    '2025-05-27': "Arrays Revision Finished \n\n- Watched 2/50 Hours of One Shot ReactJS ✅ \n -Kadane's Algorithm ✅ \n- Dutch National Flag Algorithm ✅ \n- Rearranging Array by sign ✅",
    '2025-05-28': "Medium Problems in Arrays Started \n\n- Completed a short course on Accounting Fundamentals to refresh previous knowledge ✅ \n -Next Permutation ✅ \n- Leaders in an Array ✅ \n- Largest Consectuvie Sequence ✅",
    '2025-05-29': "Medium Problems in Arrays almost finished \n\n- Made a little bit of progress in the ReactJS One Shot ✅ \n -Set Matrix Zeroes ✅ \n- Rotate a matrix by 90 degrees ✅ \n- Spiral Traversal of a Matrix ✅",
    '2025-05-30': "Medium Problems in Arrays finished \n\n -Pascals' Triangle ✅ \n- Majority Element N/3 Times ✅ \n- Count Number of Subarrays with given sum ✅",
    '2025-05-31': "Hard Problems in Arrays started \n\n -3 Sum Problem ✅",
    '2025-06-01': "Hard Problems in Arrays continued \n\n -4 Sum Problem ✅ \n- Number of Subarrays with XOR K ✅ \n- Merge Overlapping Intervals ✅",
    '2025-06-02': "Worked on freelance Project",
    '2025-06-03': "Made progress into ReactJS Oneshot \n\n- Merge Sorted arrays without using extra space ✅ \n- Find repeating and missing elements ✅ \n",
    '2025-06-04': "Worked on freelance Project",
    '2025-06-05': "Worked on freelance project \n\n- Count Inversions ✅ \n- Reverse Pairs ✅ \n- Maximum Product Subarray ✅",
    '2025-06-06': "Started with binary search, arrays finished \n\n- Basics of Binary Search ✅ \n- ReactJS course 3 Hours completed ✅ \n- Finalized freelance project ✅",
    '2025-06-07': "Binary search continued \n\n- Lower and Upper Bound ✅ \n- Floor and Ceiling ✅ \n- Search Element in Sorted Rotated Array ✅",
    '2025-06-08': "Binary search continued \n\n- Finished React.JS Basics ✅\n- Search Element in Sorted Rotated Array Part II ✅ \n- Minimum Element in Sorted Rotated Array ✅ \n- Find how many times has array been rotated ✅ \n- Single Element in Sorted Duplicated Array ✅",
    '2025-06-09': "Binary search continued \n\n- Find Peak Element ✅\n- Square Root using Binary Search ✅\n Nth Root using Binary Search ✅",
    '2025-06-10': "Binary search continued \n\n- Started React.JS Basic projects \n- Koko Eating Bananas ✅\n Minimum Days to make M Bouquets ✅",
    '2025-06-11': "Nothing done today",
    '2025-06-12': "Started Major ReactJS Project \n\n- Continued with Binary Search in Answers \n- kth Missing Positive Integer ✅\n- Least Capacity to ship packages within D Days ✅\n- Smallest divisor given a threshold ✅",
    '2025-06-13': "Continued with Binary Search in Answers \n\n- Aggressive Cows ✅ \n- Book Allocation ✅ \n- Painters Partition / Split Array Largest Sum ✅",
    '2025-06-14': "Continued with Binary Search in Answers \n\n- Median of Two Sorted Arrays ✅ \n- Minimise Maximum Distance Between 2 Gas Stations ✅ \n- Kth Element of Two Sorted Arrays ✅",
    '2025-06-15': "Started Binary Search in 2D Arrays \n\n- Row with Maximum number of Ones ✅ \n- Element Search in fully sorted 2D Matrix ✅ \n- Element Search in Row Wise Sorted 2D Matrix ✅",
    '2025-06-16': "Nothing done today (on a trip)",
    '2025-06-17': "Nothing done today (on a trip)",
    '2025-06-18': "Continued Binary Search in 2D Arrays \n\n- Peak Element in 2D Matrix ✅",
    '2025-06-19': "Finished Binary Search, Started Strings \n\n- Median in a 2D Matrix Sorted Row wise ✅ \n- Remove Outer Paranthesis ✅ \n- Reverse words in a string ✅ \n- Largest Odd Number ✅ \n- Largest Common Prefix ✅",
    '2025-06-20': "Nothing done today (on a trip)",
    '2025-06-21': "Strings Almost Finished (easy & medium) \n\n- Isomorphic Strings ✅ \n- String has been rotated ✅ \n- Valid Anagram ✅ \n- Depth of Parantheses ✅ \n- Roman Numeral to Integer ✅ \n- Atoi Conversion ✅",
    '2025-06-22': "Nothing done today (on a trip)",
    '2025-06-23': "Nothing done today (on a trip)",
    '2025-06-24': "Strings Finished (easy & medium), Starting with Linked Lists \n\n- Sum of Beauty of All Substrings ✅",
    '2025-06-25': "Worked on ReactJS Project",
    '2025-06-26': "Started CNN Project, working on data collection",
    '2025-06-27': "Learnt Basics of LinkedList and Its Traversal",
    '2025-06-28': "Worked on CNN Project's data collection and ReactJS Project",
    '2025-06-29': "Linked List Deletion & Insertion Problems Done, Collected more data for CNN Project and made basic conversion scripts",
    '2025-06-30': "More data collected for CNN Project. Double Linked List Started.",
    '2025-07-01': "Doubly Linked List Basic Problems",
    '2025-07-02': "Insertion and Deletion in a Doubly Linked List",
    '2025-07-03': "Reversing a Doubly Linked List along with Data resizing for CNN Project",
    '2025-07-04': "Started Medium Problems of Singly Linked List along with Augmentation of Dataset for CNN Project \n\n- Middle of a Linked List ✅\n- Reverse a Linked List ✅\n- Detecting a Loop in the Linked List ✅\n- Starting point of loop in Linked List ✅",
    '2025-07-05': "Medium problems of Singly Linked List continued along with Conversion of Dataset to Binary Format for CNN Project \n\n- Length of a Loop ✅\n- Check if a Linked List is a Palindrome or not ✅\n- Seggrregate Odd and Even Nodes in Linked List ✅",
    '2025-07-06': "Medium problems of Singly Linked List finished \n\n- Remove Nth Node from Back ✅\n- Sorting a Linked List using Merge Sort ✅\n- Sorting a Linked List only containing 0 1 and 2 ✅\n- Intersection of Y Linked List ✅\n- Adding 1 to a Linked List ✅\n- Adding two Linked Lists ✅ ",
    '2025-07-07': "Finished Medium problems of Doubly Linked List \n\n- Deleting all occurences of a Key in Linked List  ✅\n- Finding pairs with a given sum in a sorted doubly linked list ✅\n- Deleting duplicated nodes from a sorted doubly linked list ✅",
    '2025-07-08': "Started Hard problems of Doubly Linked List \n\n- Reversing Nodes in K Group Size ✅\n- Rotating a Linked List ✅\n- Merging Two Sorted Linked Lists ✅\n- Merging K Sorted Linked Lists ✅\n- Flattening out a Linked List ✅",
    '2025-07-09': "Finished Linked Lists \n\n- Copy Linked List with Random Pointers ✅",
    '2025-07-10': "Started Hard String Problems \n\n- Minimum Addition to make parenthesis string valid ✅\n- Count and Say ✅",
    '2025-07-11': "Finished Hard String Problems that do not involve Dynamic Programming \n\n- Repeated String Match ✅",
    '2025-07-12': "Worked on Odoo Hackathon's Stackit Problem Statement and started with Bit Manipulation"
};
const predefinedSources = {
    '2025-05-24': [
        { url: 'https://www.youtube.com/watch?v=ogjf7ORKfd8&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=15', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' }
    ],
    '2025-05-25': [
        { url: 'https://www.youtube.com/watch?v=wvcQg43_V8U&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=18', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' }
    ],
    '2025-05-26': [
        { url: 'https://www.youtube.com/watch?v=UXDSeD9mN-k&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=21', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' },
        { url: 'https://leetcode.com/problems/two-sum/submissions/1645323649/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png' }
    ],
    '2025-05-27': [
        { url: 'https://www.youtube.com/watch?v=h4aBagy4Uok&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=26', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' },
        { url: 'https://www.youtube.com/watch?v=M9O5AjEFzKw', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' },
        { url: 'https://leetcode.com/problems/rearrange-array-elements-by-sign/submissions/1646343563/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png' }
    ],
    '2025-05-28': [
        { url: 'https://leetcode.com/problems/longest-consecutive-sequence/solution/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png' },
        { url: 'https://www.youtube.com/watch?v=h4aBagy4Uok&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=29', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' },
        { url: 'https://www.coursera.org/programs/manipal-education-tguaf/learn/learn-accounting-fundamentals-corporate-finance', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Coursera_logo_%282020%29.svg/2560px-Coursera_logo_%282020%29.svg.png' },
    ],
    '2025-05-29': [
        { url: 'https://www.youtube.com/watch?v=h4aBagy4Uok&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=32', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' },
        { url: 'https://www.youtube.com/watch?v=M9O5AjEFzKw', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' },
        { url: 'https://leetcode.com/problems/spiral-matrix/submissions/1648322251/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png' }
    ],
    '2025-05-30': [
        { url: 'https://www.youtube.com/watch?v=h4aBagy4Uok&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=35', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' },
        { url: 'https://leetcode.com/problems/majority-element-ii/submissions/1649230100/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png' }
    ],
    '2025-05-31': [
        { url: 'https://www.youtube.com/watch?v=h4aBagy4Uok&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=36', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' },
        { url: 'https://leetcode.com/problems/3sum/submissions/1650065463/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png' }
    ],
    '2025-06-01': [
        { url: 'https://leetcode.com/problems/merge-intervals/submissions/1651088301/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png'},
        { url: 'https://www.youtube.com/watch?v=h4aBagy4Uok&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=39', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' }
    ],
    '2025-06-02': [],
    '2025-06-03': [
        { url: 'https://leetcode.com/problems/merge-sorted-array/submissions/1653048611/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png'},
        { url: 'https://www.youtube.com/watch?v=h4aBagy4Uok&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=41', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' }
    ],
    '2025-06-04': [],
    '2025-06-05': [
        { url: 'https://leetcode.com/problems/maximum-product-subarray/submissions/1655107899/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png'},
        { url: 'https://www.youtube.com/watch?v=h4aBagy4Uok&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=44', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' }
    ],
    '2025-06-06': [
        { url: 'https://www.youtube.com/watch?v=h4aBagy4Uok&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=45  ', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' }
    ],
    '2025-06-07': [
        { url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/submissions/1657023599/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png'},
        { url: 'https://www.youtube.com/watch?v=h4aBagy4Uok&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=48', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' }
    ],
    '2025-06-08': [
        { url: 'https://leetcode.com/problems/single-element-in-a-sorted-array/submissions/1658031522/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png'},
        { url: 'https://www.youtube.com/watch?v=h4aBagy4Uok&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=52', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' }
    ],
    '2025-06-09': [
        { url: 'https://leetcode.com/problems/find-peak-element/submissions/1658933075/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png'},
        { url: 'https://www.youtube.com/watch?v=h4aBagy4Uok&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=55', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' }
    ],
    '2025-06-10': [
        { url: 'https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/submissions/1660186456/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png'},
        { url: 'https://www.youtube.com/watch?v=h4aBagy4Uok&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=57', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' }
    ],
    '2025-06-11': [],
    '2025-06-12': [
        { url: 'https://leetcode.com/problems/kth-missing-positive-number/submissions/1662325824/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png'},
        { url: 'https://www.youtube.com/watch?v=h4aBagy4Uok&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=60', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' }
    ],
    '2025-06-13': [
        { url: 'https://leetcode.com/problems/split-array-largest-sum/submissions/1663312754', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png'},
        { url: 'https://www.youtube.com/watch?v=h4aBagy4Uok&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=63', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' }
    ],
    '2025-06-14': [
        { url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/submissions/1664197018/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png'},
        { url: 'https://www.youtube.com/watch?v=h4aBagy4Uok&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=67', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' }
    ],
    '2025-06-15': [
        { url: 'https://leetcode.com/problems/search-a-2d-matrix-ii/submissions/1665338378/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png'},
        { url: 'https://www.youtube.com/watch?v=h4aBagy4Uok&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=70', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' }
    ],
    '2025-06-16': [],
    '2025-06-17': [],
    '2025-06-18': [
        { url: 'https://leetcode.com/problems/find-a-peak-element-ii/submissions/1668410280/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png'},
        { url: 'https://www.youtube.com/watch?v=h4aBagy4Uok&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=71', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' }
    ],
    '2025-06-19': [
        { url: 'https://leetcode.com/problems/longest-common-prefix/submissions/1669478951/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png'},
    ],
    '2025-06-20': [],
    '2025-06-21': [
        { url: 'https://leetcode.com/problems/string-to-integer-atoi/submissions/1671785579/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png'}
    ],
    '2025-06-22': [],
    '2025-06-23': [],
    '2025-06-24': [
        { url: 'https://www.youtube.com/watch?v=Nq7ok-OyEpg', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png'},
        { url: 'https://leetcode.com/problems/sum-of-beauty-of-all-substrings/submissions/1671819695/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png'}
    ],
    '2025-06-25': [],
    '2025-06-26': [],
    '2025-06-27': [
        { url: 'https://www.youtube.com/watch?si=9PR1o8OPRWil7fRA&v=Nq7ok-OyEpg&feature=youtu.be', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png'}
    ],
    '2025-06-28': [],
    '2025-06-29': [
        { url: 'https://leetcode.com/problems/delete-node-in-a-linked-list/submissions/1680669375/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png' },
        { url: 'https://www.youtube.com/watch?si=9PR1o8OPRWil7fRA&v=Nq7ok-OyEpg&feature=youtu.be', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png'}
    ],
    '2025-06-30': [],
    '2025-07-01': [
        { url: 'https://www.youtube.com/watch?si=9PR1o8OPRWil7fRA&v=Nq7ok-OyEpg&feature=youtu.be', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png'}
    ],
    '2025-07-02': [
        { url: 'https://www.youtube.com/watch?v=0eKMU10uEDI', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png'}
    ],
    '2025-07-03': [
        { url: 'https://www.youtube.com/watch?v=u3WUW2qe6ww', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png'}
    ],
    '2025-07-04': [
        { url: 'https://leetcode.com/problems/linked-list-cycle-ii/submissions/1686380843/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png' },
        { url: 'https://www.youtube.com/watch?v=2Kd0KKmmHFc', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png'}
    ],
    '2025-07-05': [
        { url: 'https://leetcode.com/problems/odd-even-linked-list/submissions/1687185286/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png' },
        { url: 'https://www.youtube.com/watch?v=qf6qp7GzD5Q', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png'}
    ],
    '2025-07-06': [
        { url: 'https://leetcode.com/problems/add-two-numbers/submissions/1688609173/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png' },
        { url: 'https://www.youtube.com/watch?v=XmRrGzR6udg', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png'}
    ],
    '2025-07-07': [
        { url: 'https://www.youtube.com/watch?si=AsZoNUoewetsBjr0&v=YJKVTnOJXSY&feature=youtu.be', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png'}
    ],
    '2025-07-08': [
        { url: 'https://leetcode.com/problems/merge-k-sorted-lists/submissions/1691018970/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png' },
        { url: 'https://www.youtube.com/watch?v=ykelywHJWLg', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png'}
    ],
    '2025-07-09': [
        { url: 'https://www.youtube.com/watch?v=q570bKdrnlw', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' },
        { url: 'https://leetcode.com/problems/copy-list-with-random-pointer/submissions/1693415874/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png' }
    ],
    '2025-07-10': [
        { url: 'https://leetcode.com/problems/count-and-say/submissions/1694109633/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png' }
    ],
    '2025-07-11': [
        { url: 'https://leetcode.com/problems/repeated-string-match/submissions/1694168782/', image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png' }
    ],
    '2025-07-12': [
        { url: 'https://www.youtube.com/watch?v=qQd-ViW7bfk', image: 'https://www.pngplay.com/wp-content/uploads/8/Youtube-Red-Logo-PNG-Clipart-Background.png' }
    ]
};
function generateStars() {
    const numStars = 50;
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        document.body.appendChild(star);
    }
}
function generateCalendar(page) {
    calendar.innerHTML = '';
    const startIndex = (page - 1) * daysPerPage;
    const endIndex = Math.min(startIndex + daysPerPage, days);
    if (page === totalPages) {
        calendar.classList.add('last-page');
    } else {
        calendar.classList.remove('last-page');
    }
    for (let i = startIndex; i < endIndex; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        const dateKey = date.toISOString().split('T')[0];
        console.log(dateKey)
        if (date <= currentDate) {
            console.log("Reached")
            dayDiv.classList.add('progress');
        }
        if (dateKey === currentDate.toISOString().split('T')[0]) {
            console.log("Reached part 2")
            dayDiv.classList.add('current');
        }
        console.log(currentDate.toISOString().split('T')[0])
        console.log(dateKey)
        const dayLabel = document.createElement('div');
        dayLabel.classList.add('day-label');
        dayLabel.textContent = date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
        const dayNumber = document.createElement('div');
        dayNumber.textContent = `Day ${i + 1}`;
        dayDiv.appendChild(dayLabel);
        dayDiv.appendChild(dayNumber);
        dayDiv.addEventListener('click', (e) => {
            showModal(date, dayDiv, e);
        });
        calendar.appendChild(dayDiv);
    }
    pageInfo.textContent = `Page ${page}/${totalPages}`;
    prevPage.disabled = page === 1;
    nextPage.disabled = page === totalPages;
}
function showModal(date, dayDiv, event) {
    const existingModal = document.querySelector('.modal');
    if (existingModal) existingModal.remove();
    const modal = document.createElement('div');
    modal.classList.add('modal');
    const dateKey = date.toISOString().split('T')[0];
    const heading = document.createElement('h3');
    heading.textContent = date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
    });
    const content = document.createElement('textarea');
    content.classList.add('modal-content');
    content.readOnly = true;
    content.innerHTML = predefinedNotes[dateKey];
    const sources = document.createElement('div');
    sources.classList.add('modal-sources');
    (predefinedSources[dateKey] || []).forEach(source => {
        const link = document.createElement('a');
        link.href = source.url;
        link.target = '_blank';
        const img = document.createElement('img');
        img.src = source.image;
        if(source.image === "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Coursera_logo_%282020%29.svg/2560px-Coursera_logo_%282020%29.svg.png") {
            img.id = "coursera-source";
        }
        link.appendChild(img);
        sources.appendChild(link);
    });
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    modal.appendChild(heading);
    modal.appendChild(content);
    modal.appendChild(sources);
    modal.appendChild(closeButton);
    calendar.appendChild(modal);
    modal.style.display = 'block';
    const rect = dayDiv.getBoundingClientRect();
    const calendarRect = calendar.getBoundingClientRect();
    modal.style.left = `${rect.left - calendarRect.left + rect.width + 10}px`;
    modal.style.top = `${rect.top - calendarRect.top}px`;
    if (rect.left + rect.width + modal.offsetWidth > window.innerWidth) {
        modal.style.left = `${rect.left - calendarRect.left - modal.offsetWidth - 10}px`;
    }
    if (rect.top + modal.offsetHeight > window.innerHeight) {
        modal.style.top = `${rect.top - calendarRect.top - modal.offsetHeight + rect.height}px`;
    }
    closeButton.addEventListener('click', () => {
        if (date <= currentDate) {
            progressData[dateKey] = {
                progress: !progressData[dateKey]?.progress,
                notes: predefinedNotes[dateKey] || ''
            };
            localStorage.setItem('progressData', JSON.stringify(progressData));
            dayDiv.classList.toggle('progress');
        }
        modal.remove();
    });
    document.addEventListener('click', (e) => {
        if (!modal.contains(e.target) && !dayDiv.contains(e.target)) {
            modal.remove();
        }
    }, { once: true });
}
prevPage.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        generateCalendar(currentPage);
    }
});
nextPage.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        generateCalendar(currentPage);
    }
});
generateStars();
generateCalendar(currentPage);
