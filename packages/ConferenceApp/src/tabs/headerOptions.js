import { H3, styled } from '@apollosproject/ui-kit';

export default {
  headerTitle: styled(({ theme }) => ({
    paddingHorizontal: theme.sizing.baseUnit,
  }))(H3),
  headerStyle: {
    shadowColor: 'transparent',
    borderBottomWidth: 0,
    elevation: 0,
  },
};
