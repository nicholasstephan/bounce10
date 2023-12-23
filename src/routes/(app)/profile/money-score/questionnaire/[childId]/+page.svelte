<script>
  import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
  import { createActivity, getActivity } from '$lib/stores/activities';
  import { page } from '$app/stores';
  import auth from '$lib/stores/auth';

  $: childId = $page.params.childId;

  onMount(async () => {
    let activity = await getActivity(childId, 'moneyscore');
    if (!activity.length) {
      await createActivity({
        owner: [childId, $auth.id],
        type: "moneyscore",
        name: "MoneyScore",
        questions: [
          {
            question: `I have a piggy bank or other special place to save my money.`,
            section: "Save",
            answer: null,
          },
          {
            question: `I know how much money is in my piggy bank or other special place to keep my money.`,
            section: "Save",
            answer: null,
          },
          {
            question: `I put my toys away carefully, because I like to be organized.`,
            section: "Save",
            answer: null,
          },
          {
            question: `I can count coins and paper money.`,
            section: "Save",
            answer: null,
          },
          {
            question: `I have gone to a bank or ATM with my parents`,
            section: "Save",
            answer: null,
          },
          {
            question: `I have a collection of coins from other countries.`,
            section: "Citizen",
            answer: null,
          },
          {
            question: `I can recognize the dollar, pound, euro, and yen signs.`,
            section: "Citizen",
            answer: null,
          },
          {
            question: `I understand that different cultures have different rules and ways of living.`,
            section: "Citizen",
            answer: null,
          },
          {
            question: `I can point out some different countries on a map.`,
            section: "Citizen",
            answer: null,
          },
          {
            question: `I know some of the countries my parents or I have visited.`,
            section: "Citizen",
            answer: null,
          },
          {
            question: `I have borrowed a book from the library and returned it`,
            section: "Credit",
            answer: null,
          },
          {
            question: `I have lent something to someone else (a toy)`,
            section: "Credit",
            answer: null,
          },
          {
            question: `I know that my parents use credit cards to pay for things.`,
            section: "Credit",
            answer: null,
          },
          {
            question: `I know that credit card bills come every month.`,
            section: "Credit",
            answer: null,
          },
          {
            question: `I know my parents have to pay extra money if they don’t pay their credit card bill by a certain time.`,
            section: "Credit",
            answer: null,
          },
          {
            question: `I understand the difference between what I NEED and what I WANT.`,
            section: "Spend",
            answer: null,
          },
          {
            question: `If I see something I want to buy, I can wait until later to buy it.`,
            section: "Spend",
            answer: null,
          },
          {
            question: `I can save my money from my allowance so that I can buy something bigger later.`,
            section: "Spend",
            answer: null,
          },
          {
            question: `I have gone to the store and used my own money to buy something with my parents.`,
            section: "Spend",
            answer: null,
          },
          {
            question: `I know the words discount, sale, and coupon`,
            section: "Spend",
            answer: null,
          },
          {
            question: `I understand that I might get paid for special chores or jobs.`,
            section: "Paid",
            answer: null,
          },
          {
            question: `I know the difference between working as a volunteer and working for pay.`,
            section: "Paid",
            answer: null,
          },
          {
            question: `I know some of the jobs grown ups have`,
            section: "Paid",
            answer: null,
          },
          {
            question: `I know what I am good at`,
            section: "Paid",
            answer: null,
          },
          {
            question: `I can explain the words "skills" and "talents" and identify some skills and talents in other people`,
            section: "Paid",
            answer: null,
          },
          {
            question: `I talk about money with my parents.`,
            section: "Talk about Money",
            answer: null,
          },
          {
            question: `I know what these words mean: save, share, earn, and spend.`,
            section: "Talk about Money",
            answer: null,
          },
          {
            question: `My parents answer my questions about money.`,
            section: "Talk about Money",
            answer: null,
          },
          {
            question: `I know that different families have different rules about money`,
            section: "Talk about Money",
            answer: null,
          },
          {
            question: `I write thank you notes when I receive money or gifts for my birthday or other special occasions`,
            section: "Talk about Money",
            answer: null,
          },
          {
            question: `I have heard my family or my teachers use the word invest.`,
            section: "Invest",
            answer: null,
          },
          {
            question: `I collect things (trading cards, others) to trade or sell to my friends.`,
            section: "Invest",
            answer: null,
          },
          {
            question: `I understand that the choices I make today with money may change what I can do tomorrow.`,
            section: "Invest",
            answer: null,
          },
          {
            question: `I like to imagine what the world will be like when I am a grown up`,
            section: "Invest",
            answer: null,
          },
          {
            question: `I can explain the word "company" and I can name a few companies`,
            section: "Invest",
            answer: null,
          },
          {
            question: `I like to give some of my own money to people who have less than me.`,
            section: "Change the World",
            answer: null,
          },
          {
            question: `It makes me feel good to share my things with other people.`,
            section: "Change the World",
            answer: null,
          },
          {
            question: `My family shares with families who have less than we do.`,
            section: "Change the World",
            answer: null,
          },
          {
            question: `I know the difference between right and wrong.`,
            section: "Change the World",
            answer: null,
          },
          {
            question: `I know the word "charity" and have a few examples from my parents`,
            section: "Change the World",
            answer: null,
          },
 
          {
            question: `I have made money selling lemonade, cookies, or something else that I helped to make.`,
            section: "Entrepreneurial Spirit",
            answer: null,
          },
          {
            question: `I am good at helping my school, my club, or my team raise money.`,
            section: "Entrepreneurial Spirit",
            answer: null,
          },
          {
            question: `I like to create new things.`,
            section: "Entrepreneurial Spirit",
            answer: null,
          },
          {
            question: `When something is hard or disappointing I don't give up`,
            section: "Entrepreneurial Spirit",
            answer: null,
          },
          {
            question: `With my parents, I plan for what I need or want to do next week.`,
            section: "Budget",
            answer: null,
          },
          {
            question: `I know how to figure out if I have enough money of my own to buy something I want.`,
            section: "Budget",
            answer: null,
          },
          {
            question: `I know I can’t have everything I want.`,
            section: "Budget",
            answer: null,
          },
          {
            question: `I know that electricity, water, and heat all cost money.`,
            section: "Budget",
            answer: null,
          },
          {
            question: `My parents show me how they plan ahead to buy things. `,
            section: "Budget",
            answer: null,
          },
        ],
      });
      goto(`/profile/money-score/questionnaire/${childId}/0`, { replaceState: true });
    }
    else {
      for(let question of activity[0].questions) {
        if (!question.answer) {
          goto(`/profile/money-score/questionnaire/${childId}/${activity[0].questions.indexOf(question)}`, { replaceState: true });
          break;
        }
      }
    }
  });
</script>